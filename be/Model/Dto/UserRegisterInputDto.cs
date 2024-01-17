using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace be.Model.Dto
{
    public class UserRegisterInputDto
    {
        [Required][StringLength(16, MinimumLength = 8)] public string Username { get; set; }
        [Required][StringLength(16, MinimumLength = 8)] public string Password { get; set; }
    }
}