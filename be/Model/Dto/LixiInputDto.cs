using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace be.Model.Dto
{
    public class LixiInputDto
    {
        [Required]public string Username { get; set; }
    }
}