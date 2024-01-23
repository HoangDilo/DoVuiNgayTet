using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using be.Context;
using be.Model.Dto;
using be.Model.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace be.Controllers
{
    public class QuestionController : BaseApiController
    {
        private readonly DataContext _context;
        private AnswerController _answerController;
        public QuestionController(DataContext context, AnswerController answerController)
        {
            _context = context;
            _answerController = answerController;
        }

        [HttpGet("QuestionList")]
        public async Task<ActionResult<List<QuestionListOutputDto>>> QuestionList()
        {
            var question = await (from Question in _context.Question
                select new QuestionListOutputDto(){
                    QuestionId = Question.QuestionId,
                    QuestionText = Question.QuestionText,
                })
                .ToListAsync();

            foreach (var q in question)
            {
                q.AnswerList = await _answerController.SearchByQuestionId(q.QuestionId); 
            }

            return question;
        }

        [HttpPost("CreateQuestionAndAnswers")]
        public async Task<ActionResult> CreateQuestionAndAnswers([FromBody] QuestionAndAnswersInputDto input)
        {
            var user = await _context.User.SingleOrDefaultAsync(u => u.Username == input.Username);
            if (user == null) return BadRequest(new {message = "User not found!"});
            if (user.IsAdmin == false ) return BadRequest(new {message = "User not a admin!"});
            else
            {
                var newQuestion = new Question
                {
                    QuestionText = input.QuestionText,
                    Answers = input.Answers.Select(answer => new Answer
                    {
                        AnswerText = answer.Answer,
                        IsCorrect = answer.IsCorrect
                    }).ToList()
                };
            _context.Question.Add(newQuestion);
            await _context.SaveChangesAsync();
            }
            return Ok(new {message = "Create Question successfully!"});
        }

        [HttpPut("EditQuestion")]
        public async Task<ActionResult> EditQuestion([FromBody] QuestionEditInputDto input)
        {
            var user = await _context.User.SingleOrDefaultAsync(u => u.Username == input.Username);
            if (user == null) return BadRequest(new {message = "User not found!"});
            if (user.IsAdmin == false ) return BadRequest(new {message = "User is not an admin!"});
            var question = await _context.Question.SingleOrDefaultAsync(q => q.QuestionId == input.QuestionId);
            if (question == null) return BadRequest(new {message = "Question not found!"});
            if (string.IsNullOrWhiteSpace(input.QuestionText)) return BadRequest(new {message = "Invalid Text!"});
            else
            {
                question.QuestionText = input.QuestionText;
                await _context.SaveChangesAsync();
            }
            return Ok(new {message = "Edit Question successfully!"});
        }

        [HttpDelete("DeleteQuestion")]
        public async Task<ActionResult> DeleteQuestion([FromBody] QuestionDeleteInputDto input)
        {
            var user = await _context.User.SingleOrDefaultAsync(u => u.Username == input.Username);
            if (user == null) return BadRequest(new {message = "User not found!"});
            if (user.IsAdmin == false ) return BadRequest(new {message = "User is not an admin!"});
            var answer = await _context.Answer.Where(a => a.QuestionId == input.QuestionId).ToListAsync();
            var question = await _context.Question.SingleOrDefaultAsync(q => q.QuestionId == input.QuestionId);
            if (question == null) return NotFound(new {message = "Question not found!"});
            else
            {
                _context.Question.Remove(question);
                _context.Answer.RemoveRange(answer);
                await _context.SaveChangesAsync();
            }
            return Ok(new {message = "Delete Question successfully!"});
        }
    }
}