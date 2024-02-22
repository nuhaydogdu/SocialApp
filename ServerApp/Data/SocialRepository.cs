using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ServerApp.Models;

namespace ServerApp.Data
{
    public class SocialRepository : ISocialRepository
    {

        //interfaceyii çağırdığımızda ilgili nesne gelecek dolayısıyla stratup.cs içerisine gidip inject işlemini tanıtıyoruz.
        // services.AddScoped<ISocialRepository, SocialRepository>();
        private readonly SocialContext _context;
        public SocialRepository(SocialContext context)
        {
            _context = context;
        }
        public async Task<User> GetUser(int id)
        {
            // ilgili kullanıcıların resim bilgilerini de include ediyoruz .Include(i=>i.Images)
            var user = await _context.Users.Include(i => i.Images).FirstOrDefaultAsync(i => i.Id == id);
            return user;
        }

        //bütün kullanıcıları alma yöntemimiz aşağıdaki gibiydi 
        //tüm user bilgileri geldikten sonra filtreleme yapmak mantıklı değildi o yüzden sorguyu aşağıdaki yöntemle 
        // .AsQueryable ile çalıştırılmayan bir sorguya dönüştürüp bu sorguyu filtrelemeler bittikten sonra en son ToListAsync() ile çalıştıracağız. 
        // public async Task<IEnumerable<User>> GetUsers(UserQueryParams userParams)
        // {
        //     var users = await _context.Users
        //     .Where(i => i.Id != userParams.UserId)
        //     .Include(i => i.Images)
        //     .ToListAsync();
        //     return users;
        // }

        public async Task<IEnumerable<User>> GetUsers(UserQueryParams userParams)
        {
            var users = _context.Users
            .Where(i => i.Id != userParams.UserId)
            .Include(i => i.Images)
            .OrderByDescending(i => i.LastActive)
            .AsQueryable();

            if (userParams.Followers)
            {
                //takip edenler 
                var result = await GetFollows(userParams.UserId, false);
                users = users.Where(u => result.Contains(u.Id));
            }

            if (userParams.Followings)
            {
                //takip edilenler
                var result = await GetFollows(userParams.UserId, true);
                users = users.Where(u => result.Contains(u.Id));
            }



            if (!string.IsNullOrEmpty(userParams.Gender))
            {
                users = users.Where(i => i.Gender == userParams.Gender);
            }

            //buradaki yaşa gre filtrelemeden hiçbirşey anlamadım 
            if (userParams.minAge != 18 || userParams.maxAge != 100)
            {
                var today = DateTime.Now;
                var min = today.AddYears(-userParams.maxAge + 1);
                var max = today.AddYears(-userParams.minAge);

                users = users.Where(i => i.DateOfBirth >= min && i.DateOfBirth <= max);
            }

            if (!string.IsNullOrEmpty(userParams.City))
            {
                users = users.Where(i => i.City.ToLower() == userParams.City.ToLower());
            }

            if (!string.IsNullOrEmpty(userParams.Country))
            {
                users = users.Where(i => i.Country.ToLower() == userParams.Country.ToLower());
            }


            if (!string.IsNullOrEmpty(userParams.OrderBy))
            {
                if (userParams.OrderBy == "age")
                {
                    users = users.OrderBy(i => i.DateOfBirth);
                }
                else if (userParams.OrderBy == "created")
                {
                    users = users.OrderByDescending(i => i.Created);
                }

            }


            return await users.ToListAsync();
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> IsAlreadyFollowed(int followerUserId, int userId)
        {
            return await _context.UserToUser.AnyAsync(i => i.FollowerId == followerUserId && i.UserId == userId);
        }

        public async Task<bool> SaveChanges()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        //kullanıcıların sadece id bilgilerini geri göndereceğiz
        //isFollowers alanı true ise takipçileri getireceğiz  false ise takip edilen kişileri almaya çalışacağız
        private async Task<IEnumerable<int>> GetFollows(int userId, bool IsFollowings)
        {
            //burada Include ile takip edenler ve takip edilenler listesini alacağız 
            var user = await _context.Users
                    .Include(i => i.Followers)
                    .Include(i => i.Followings)
                    .FirstOrDefaultAsync(i => i.Id == userId);  //buradada kullanıcı id'sine göre bir filtreleme yapıyoruz 

            if (IsFollowings)
            {
                //takip edenler
                //gelen bilgiler üzerinden farklı bir liste oluşturmak istediğimiz zaman selecti kullanıyoruz
                return user.Followers
                .Where(i => i.FollowerId == userId)
                .Select(i => i.UserId);
            }
            else
            {
                // takip ettiklerimiz
                return user.Followings
                .Where(i => i.UserId == userId)
                .Select(i => i.FollowerId);
            }

        }

    }
}