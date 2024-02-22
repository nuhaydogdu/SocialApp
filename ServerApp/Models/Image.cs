using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServerApp.Models
{
    public class Image
    {
        public int Id {get; set;}
        public string Name {get; set;}
        public string Description {get; set;}
        public DateTime DateAdded {get; set;}
        public bool IsProfile {get; set;}

        // burada bir navigation property tanımlıyoruz(bir resim bir kullanıcıya ait olabilir)
        // ımage için veri tabanı tablosu eklendiğinde User içinde UserId yabancı anahtar eklenmiş olacak
        // tanımlamış olduğumuz navigation sebebiyle gelen UserId alanı nulable olacak (public int? UserId {get; set;}) gibi eğer zorunlu olmasını istiyorsak bellirtmemiz gerekiyor her resmin bir userId'si olsun
        public int UserId {get; set;}
        public User User {get; set;}
        
    }
}
        