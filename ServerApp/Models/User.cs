using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace ServerApp.Models
{
    public class User : IdentityUser<int>   //buradaki int id değerinin integer olması için
    {
        public string Name { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Introduction { get; set; }
        public string Hobbies { get; set; }

        // burada bir navigation property tanımlıyoruz(bir kullanıcının birden fazla resmi olabilir)
        public List<Image> Images { get; set; }
        // Her bir kullanıcının followersini aldığımızda bizim için önemli olan followerId ile eşleşen  kayıtlar
        // Tam tersi fallowinglere giderkende UserId ile eşleşen kayıtlar
        //burada yazdığımı SocialContext içerisinde FluentApi yöntemiyle belirmiş olduk!!!!
        public ICollection<UserToUser> Followings { get; set; }
        public ICollection<UserToUser> Followers { get; set; }

        // public ICollection<Message> Messages { get; set;} şeklinde olsaydı ekstradan FluentApi işçerisinde belirtmeye gerek yoktu 
        //Message tablosuyla User tablosu arasında iki tane collectionu bağlyoruz dolayısıyla fluentApi ile varsayılan özelliği ezdiğimizi ve ekstra olarak bunu kullandığımızı söylememiz gerekiyor.
        public ICollection<Message> MessagesSent { get; set; }
        public ICollection<Message> MessagesReceived { get; set; }
    }
}