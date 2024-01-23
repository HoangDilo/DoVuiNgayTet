using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace be.Model.Dto
{
    public class UserLoginInputDto
    {
        [Required] public string Username { get; set; }
        [Required] public string Password { get; set; }
        public string Link { get; set; }
    }
}