using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServerApp.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public string Name {get; set;}
        public decimal price {get; set;}
        public bool isActive {get; set;}

        public string Secret {get; set;}
    }
} 