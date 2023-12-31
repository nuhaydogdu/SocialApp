using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using ServerApp.Data;
using ServerApp.Models;

namespace ServerApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        readonly string MyAllowOrigins="_myAllowOrigins";
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<SocialContext>(x=>x.UseSqlite("Data Source=social.db"));
            services.AddIdentity<User,Role>().AddEntityFrameworkStores<SocialContext>(); //projeye ıdentity ekledikten sonra bunu eledik, bu şekilde aktif ediyoruz.
            services.Configure<IdentityOptions>(options=>{                               //projeye ıdentity ekledikten sonra bunu eledik, bu şekilde aktif ediyoruz.
               
                options.Password.RequireLowercase=true;
                options.Password.RequireUppercase=true;
                options.Password.RequireDigit=true;
                options.Password.RequireNonAlphanumeric=true;
                options.Password.RequiredLength=6;

                options.Lockout.DefaultLockoutTimeSpan=TimeSpan.FromMinutes(5);
                options.Lockout.MaxFailedAccessAttempts=5;
                options.Lockout.AllowedForNewUsers=true;

                // options.User.AllowedUserNameCharacters=""; parola içerisnde olabilecek karakterleri burada belirtebiliyoruz.
                options.User.RequireUniqueEmail=true;

                
            });
            services.AddControllers().AddNewtonsoftJson();
            services.AddCors(options=> {
                options.AddPolicy(
                    name:MyAllowOrigins,
                    builder=>{
                        builder
                               .WithOrigins("http://localhost:4200")
                               .AllowAnyHeader()
                               .AllowAnyMethod();
                    });
            });
        
            //Oluşturduğumuz token bilgisini validate etmek için
            services.AddAuthentication(x=>{
                x.DefaultAuthenticateScheme =JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme= JwtBearerDefaults.AuthenticationScheme;

            })

            .AddJwtBearer(x=>{
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters{
                  ValidateIssuerSigningKey = true,
                  IssuerSigningKey =new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:Secret").Value)),
                  ValidateIssuer= false,
                  ValidateAudience = false

                };

            });
            //

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(MyAllowOrigins);

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                 endpoints.MapControllers();
            });
        }
    }
}
