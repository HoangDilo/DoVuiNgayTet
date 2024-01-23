using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace be.Model.Dto
{
    public class QuestionEditInputDto
    {
        public string Username { get; set; }
        public long QuestionId { get; set; }
        public string QuestionText { get; set; }
    }
}