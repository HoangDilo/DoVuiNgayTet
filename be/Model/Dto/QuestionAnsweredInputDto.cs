using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace be.Model.Dto
{
    public class QuestionAnsweredInputDto
    {
        [Required]public string Username { get; set; }
        [Required]public long QuestionId { get; set; }
        [Required]public long AnswerId { get; set; }
    }
}