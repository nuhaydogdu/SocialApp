using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServerApp.DTO
{
    public class ImagesForDetails
    {
    //Dto yapısıyla istediğimiz özellikleri alırken public List<Image> Images {get; set;} şekldinde kullanırsam içerisnde navigation property sebebiyle user bilgilerinide getiriyordu.
    // O yziden ayrı bir ImageForDetailsDTO'sunu oluşturduk.
        public int Id {get; set;}
        public string Name {get; set;}
        public string Description {get; set;}
        public DateTime DateAdded {get; set;}
        public bool IsProfile {get; set;}
    }
}