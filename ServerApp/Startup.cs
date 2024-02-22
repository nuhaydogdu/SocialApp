using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
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
using ServerApp.Helpers;
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
        readonly string MyAllowOrigins = "_myAllowOrigins";
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<SocialContext>(x => x.UseSqlite("Data Source=social.db"));
            services.AddIdentity<User, Role>().AddEntityFrameworkStores<SocialContext>(); //projeye ıdentity ekledikten sonra bunu eledik, bu şekilde aktif ediyoruz.
            services.AddScoped<ISocialRepository, SocialRepository>();
            services.Configure<IdentityOptions>(options =>
            {                               //projeye ıdentity ekledikten sonra bunu eledik, bu şekilde aktif ediyoruz.

                options.Password.RequireLowercase = true;
                options.Password.RequireUppercase = true;
                options.Password.RequireDigit = true;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequiredLength = 6;

                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                options.Lockout.MaxFailedAccessAttempts = 5;
                options.Lockout.AllowedForNewUsers = true;

                // options.User.AllowedUserNameCharacters=""; parola içerisnde olabilecek karakterleri burada belirtebiliyoruz.
                options.User.RequireUniqueEmail = true;


            });
            services.AddAutoMapper(typeof(Startup));
            services.AddControllers().AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore; //biribirini referans gösteren model sınıflarımızdan dolayı oluşan bir hata var o yüzden buraya ekleme yaptık(Self referencing loop)(User ve Image Bİlgisi arasındaki ilişki)
            });
            services.AddCors(options =>
            {
                options.AddPolicy(
                    name: MyAllowOrigins,
                    builder =>
                    {
                        builder
                               .WithOrigins("http://localhost:4200")
                               .AllowAnyHeader()
                               .AllowAnyMethod();
                    });
            });

            //Oluşturduğumuz token bilgisini validate etmek için
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            })

            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:Secret").Value)),
                    ValidateIssuer = false,
                    ValidateAudience = false

                };

            });
            services.AddScoped<LastActiveActionFilters>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, UserManager<User> userManager)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                SeedDatabase.Seed(userManager).Wait();
            }
            else
            {
                //production aşamasında oluşabilecek server hataları için hata yönetimi
                //gelen context bilgisi içerisine bir response oluşturacağız ve bu response içerisine gelen exception bilgisini istediğimiz formatta(ErrorDetails) ekleyeceğiz
                //başlayan ve biten bir süreç var bu sürece herhangi bir aşamada müdahale etmek için middleware kullanıyoruz
                app.UseExceptionHandler(appError =>
                {
                    appError.Run(async context =>
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        context.Response.ContentType = "application/json";

                        var exception = context.Features.Get<IExceptionHandlerFeature>();
                        if (exception != null)
                        {
                            //loglama=> nlog, elmeah bunlar kullanılabilir
                            await context.Response.WriteAsync(new ErrorDetails()
                            {
                                StatusCode = context.Response.StatusCode,
                                Message = exception.Error.Message
                            }.ToString());
                        }
                    });
                });
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
