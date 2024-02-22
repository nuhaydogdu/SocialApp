using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace ServerApp.Models
{
    public class ErrorDetails
    {
        public int StatusCode {get; set;}
        public string Message {get; set;}

        //ErrorDetailsten oluşturulacak olan nesneyi serialize edecek
        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}