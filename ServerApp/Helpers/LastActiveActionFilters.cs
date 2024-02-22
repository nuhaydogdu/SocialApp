using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc.Filters;
using ServerApp.Data;

namespace ServerApp.Helpers
{
    //(41)
    //last active alanını ayarlayabilemk için (Filters in ASP.NET Core) yaoılarından faydalanarak middlware mantığıyla işlemlerimiz yapıp lastSctive alanımızı düzenlemeye çelışıyoruz
    //LastActiveActionFilters calsımız IAsyncActionFilter'dan türetilecek

    public class LastActiveActionFilters : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();  //urada süreci durdurmuş oluyoruz ve arada userıd bilgisini alıyoruz

            var id = int.Parse(resultContext.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);  //aktif olan kullanıcının user İd bİlgisi

            var repository = (ISocialRepository)resultContext.HttpContext.RequestServices.GetService(typeof(ISocialRepository));

            var user = await repository.GetUser(id);
            user.LastActive = DateTime.Now;
            await repository.SaveChanges();
        }
    }
}
