using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ServerApp.DTO;
using ServerApp.Models;

namespace ServerApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public readonly IConfiguration _configuration;

        // Login işlemi için yani parolayla kullanıcı adını karşılaştırmak için SignInManager'i kullanıyoruz
        //secret bilgisine ulaşmak için Configuration objesine injection ile ulaşmaya çalışıyoruz.
        public AuthController(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
            _signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDTO model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = new User
            {
                UserName = model.UserName,
                Email = model.Email,
                Name = model.Name,
                Gender = model.Gender,
                DateOfBirth = model.DateofBirth,
                Country = model.Country,
                City = model.City,
                Created = DateTime.Now,
                LastActive = DateTime.Now

            };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return StatusCode(201);
            }

            return BadRequest(result.Errors);
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDTO model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            //buradan yollamış oludğumuz hata bilgisine startup içerisinden ulaşabileceğiz
            // throw new Exception("interval exception");

            var user = await _userManager.FindByNameAsync(model.UserName);

            if (user == null)
                return BadRequest(new { message = "username is İncorrect" });

            var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false); //buradaki false kişi hatalı giriş yapınca hesabının kitlenip kitlenmeyeceğiyle alakalı, startup.cs'te belirtmiştik ama burada eziyourz.

            if (result.Succeeded)
            {
                //login
                return Ok(new
                {
                    token = GenerateJwtToken(user),
                });
            }
            return Unauthorized();
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration.GetSection("AppSettings:Secret").Value); //burada secrete ulaşıyorum.

            //Token bilgisi içerisinde olmasını istediğimiz kısımlar.
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]{
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName)
             }),
                //geçerlilik süresi
                Expires = DateTime.UtcNow.AddDays(1),

                //Tokeni şifreleyeceğiz ve hangi algoritmayı kullanacağımızı ve key bilgisini yazıyoruz
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);

        }
    }
}