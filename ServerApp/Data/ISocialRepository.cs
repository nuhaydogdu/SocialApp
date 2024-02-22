using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ServerApp.Models;

namespace ServerApp.Data
{
    public interface ISocialRepository
    {
        void Add<T>(T entitty) where T : class;

        void Delete<T>(T entitty) where T : class;

        Task<bool> SaveChanges();

        Task<User> GetUser(int id);

        // IEnumerable sadece bir koleksiyon üzerinde sıralı bir şekilde gezinme yeteneği sağlar. 
        Task<IEnumerable<User>> GetUsers(UserQueryParams userParams);

        Task<bool> IsAlreadyFollowed(int followerUserId, int userId);
    }
}