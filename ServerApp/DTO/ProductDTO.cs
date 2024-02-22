using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServerApp.DTO
{
    public class ProductDTO
    {    
        //Data transfer objeleri DTO
        //product Modelsınıfındaki içeriği buraya aldım ama istemediklerimi(kullanıcıya görünmesini istemediklerimi) buradan çıkardım 
        //İlk olarak dto yu bu şekilde yazdık daha sonra ProductController içerisindeki GetProducts içerisnde kullandım
        public int ProductId { get; set; }
        public string Name {get; set;}
        public decimal price {get; set;}
        public bool isActive {get; set;}
    }
}