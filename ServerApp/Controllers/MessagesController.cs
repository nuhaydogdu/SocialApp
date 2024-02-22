using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration.UserSecrets;
using ServerApp.Data;
using ServerApp.DTO;
using ServerApp.Helpers;
using ServerApp.Models;

namespace ServerApp.Controllers
{

    [ServiceFilter(typeof(LastActiveActionFilters))]
    [Authorize]
    [Route("api/users/{userId}/[controller]")]
    [ApiController]

    public class MessagesController : ControllerBase
    {

        private readonly ISocialRepository _repository;
        private readonly IMapper _mapper;

        public MessagesController(ISocialRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        // mesajı gönderen kullanıcının id bilgisi ve mesaj içeriği 
        [HttpPost]
        public async Task<IActionResult> CreateMessage(int userId, MessageForCreateDTO messageForCreateDTO)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            messageForCreateDTO.SenderId = userId;

            var recipient = await _repository.GetUser(messageForCreateDTO.RecipientId);

            if (recipient == null)
                return BadRequest("mesaj göndermek istediğiniz kullanıcı yok");

            //veritabanına eklemek istediğimiz mesajı oluşşturduk Formdan gelen bilgiyi(messageForCreatedDTO) Message'ye çeviriyoruz ki bunu repositorye eleyebilelim 
            //var message = _mapper.Map<NEYİDÖNÜŞTÜRECEĞİZ>(NEYEDÖNÜŞTÜRECEĞİZ); 
            var message = _mapper.Map<Message>(messageForCreateDTO);

            _repository.Add(message);

            if (await _repository.SaveChanges())
            {
                var messageDTO = _mapper.Map<MessageForCreateDTO>(message);
                return Ok(messageDTO);
            }
            throw new System.Exception("error");
        }

    }
}