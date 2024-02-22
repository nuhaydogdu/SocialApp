using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServerApp.Models
{
    public class UserQueryParams
    {
        public int UserId { get; set; }

        public bool Followers { get; set; }

        public bool Followings { get; set; }

        public string Gender { get; set; }

        //SocialRepository içerisinde bu bilgiler haricinde bir seçim yapmışmı yapmamış mı bunları kontrol ediyoruz. 18, 100 
        public int minAge { get; set; } = 18;

        public int maxAge { get; set; } = 100;

        public string City { get; set; }

        public string Country { get; set; }

        //sıralama için OrderBy Propertisini ekledik ve orderBy'a göderilen değerlere göre filtreleme işlemini yapacağız

        public string OrderBy { get; set; }
    }
}