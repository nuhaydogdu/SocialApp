using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ServerApp.DTO
{
    public class UserForRegisterDTO
    {
        [Required(ErrorMessage = "Name field is required.")]
        [StringLength(50, MinimumLength = 3)]
        public string Name { get; set; }
        public string UserName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public string Gender { get; set; }
        [Required]
        public string Password { get; set; }
        public DateTime DateofBirth { get; set; }
        [Required]
        public string Country { get; set; }
        [Required]
        public string City { get; set; }
    }
}