using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ServerApp.DTO;
using ServerApp.Models;

namespace ServerApp.Helpers
{
    // klasımızın bir profile'den türetilmsi gerekiyor? (35)
    public class MapperProfiles : Profile
    {
        public MapperProfiles()
        {
            // Constructor içerisinde map edeceğimiz objeleri belirliyoruz (35)
            //User bilgisini ne zaman çağırırsak gelen bilgiler UserForListDTO ile eşleştirilecek
            CreateMap<User, UserForListDTO>()
             .ForMember(dest => dest.ImageUrl, opt =>                             //dest.Image UserForListDTO İçerisinde bizim dodurmak istediğimiz alan
                opt.MapFrom(src => src.Images.FirstOrDefault(i => i.IsProfile).Name)) //resimler içerisinden IsProfile alanı true olan bilgi
             .ForMember(dest => dest.Age, opt =>
                  opt.MapFrom(src => src.DateOfBirth.CalculateAge()));     //buradaki Calculate methodu normalde DateTime içerisnde extend olan bi method değil bizde o yüzden ayrı olarak yazma ihtiyacı hissettik ve ServerApp->Helper altındaki ExtensionMethods klasını oluşturup fonksiyonumuzu tanımladık

            CreateMap<User, UserForDetailsDTO>()
             .ForMember(dest => dest.ProfileImageUrl, opt =>
                opt.MapFrom(src => src.Images.FirstOrDefault(i => i.IsProfile).Name))
             .ForMember(dest => dest.Images, opt =>
                 opt.MapFrom(src => src.Images.Where(i => !i.IsProfile).ToList()))
             .ForMember(dest => dest.Age, opt =>
                opt.MapFrom(src => src.DateOfBirth.CalculateAge()));

            CreateMap<Image, ImagesForDetails>();

            //bu aşamaya kadar bize gelen User bilgisi Image bilgisin ilgili DTO'ya bir güncelleme yapıyorduk  burada gelen User Bilgisinden userForDetailsDTO'ya bir bilgi aktarımı yapıyoruz.
            //Çift yönü aktarımı desteklemek için ReverseMap()'i kullanıyoruz
            CreateMap<User, UserForUpdateDTO>().ReverseMap();

            CreateMap<MessageForCreateDTO, Message>().ReverseMap();

        }
    }
}