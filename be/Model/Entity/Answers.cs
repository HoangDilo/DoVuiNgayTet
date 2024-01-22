using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace be.Model.Entity
{
    public class Answers
    {
        public long AnswerId { get; set; }
        public long QuestionId { get; set; }
        public string Answer { get; set; }
        public bool IsCorrect { get; set; }
    }
}