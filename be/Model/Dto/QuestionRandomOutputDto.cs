using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace be.Model.Dto
{
    public class QuestionRandomOutputDto
    {
        public long QuestionId { get; set; }
        public string QuestionText { get; set; }
        public List<AnswerListOutputDto> AnswerList { get; set; }
    }
}