using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using ServerApp.Models;
using System.IO;
using Newtonsoft.Json;

namespace ServerApp.Data
{
    public static class SeedDatabase
    {
        public static async Task Seed(UserManager<User> userManager){
            // User tablosu içerisinde bir kullanıcı varsa bize true bilgisi gelir.
            if(!userManager.Users.Any()){  
                // System.IO.File.ReadAllText("Data/users.json") bu şekilde ilgili dosya içerisini okuyoruz.
                var users = File.ReadAllText("Data/users.json");
                var listOfUsers = JsonConvert.DeserializeObject<List<User>>(users);

                foreach(var user in listOfUsers)
                {
                    await userManager.CreateAsync(user,"SocialApp_123"); 
                    // kendiliğinden oluşturulan kişilerin tamamının şifresi SıcialAoo_123
                }
            }
        }
        
    }
}