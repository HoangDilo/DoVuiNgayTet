using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace be.Model.Dto
{
    public class AnswerListOutputDto
    {
        public long AnswerId { get; set; }
        public string AnswerText { get; set; }
        public bool IsCorrect { get; set; }
        public string QuestionText { get; set; }
    }
}