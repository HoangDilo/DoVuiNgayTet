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
                q.Answers = await _answerController.SearchByQuestionId(q.QuestionId); 
            }

            return question;
        }

        [HttpPost("CreateQuestionAndAnswers")]
        public async Task<ActionResult> CreateQuestionAndAnswers([FromBody] QuestionAndAnswersInputDto input)
        {
            var user = await _context.User.SingleOrDefaultAsync(u => u.Username == input.Username);
            if (user == null) return BadRequest(new {message = "User not found!"});
            if (user.IsAdmin == false ) return BadRequest(new {message = "User not a admin!"});
            if (string.IsNullOrWhiteSpace(input.QuestionText)) return BadRequest(new {message = "Invalid Text!"});
            if (input.Answers == null || input.Answers.Count != 4 || input.Answers.Count(a => a.IsCorrect) != 1)
            {
                return BadRequest(new { message = "Invalid number of answers or incorrect answer count!" });
            }
            else
            {
                var newQuestion = new Question
                {
                    QuestionText = input.QuestionText,
                    Answers = input.Answers.Select(answer => new Answer
                    {
                        AnswerText = answer.AnswerText,
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

        [HttpGet("GetRandomQuestion")]
        public async Task<ActionResult<List<QuestionRandomOutputDto>>> RandomQuestion([FromQuery] QuestionRandomInputDto input)
        {
            var user = await _context.User.SingleOrDefaultAsync(u => u.Username == input.Username);
            var question = await _context.Question
            .OrderBy(x => Guid.NewGuid())
            .Take(30)
            .Select(question => new QuestionRandomOutputDto
            {
                QuestionId = question.QuestionId,
                QuestionText = question.QuestionText,
            })
            .ToListAsync();

            foreach (var q in question)
            {
                q.Answers = await _answerController.AnswerByQuestionId(q.QuestionId);
                q.Answers = q.Answers.OrderBy(x => Guid.NewGuid()).ToList();
            }

            return question;
        }

        [HttpPost("Question")]
        public async Task<ActionResult> Question([FromQuery] QuestionAnsweredInputDto input)
        {
            var user = await _context.User.SingleOrDefaultAsync(u => u.Username == input.Username);
            if (user == null) return BadRequest(new {message = "User not found!"});
            var question = await _context.Question.SingleOrDefaultAsync(q => q.QuestionId == input.QuestionId);
            if (question == null) return BadRequest(new {message = "Question not found!"});
            var answer = await _context.Answer.SingleOrDefaultAsync(a => a.AnswerId == input.AnswerId);
            if (answer == null) return BadRequest(new {message = "Answer not found!"});
            if (answer.QuestionId != input.QuestionId) return BadRequest(new {message = "Answer not found!"});
            user.Money = 0;
            if (answer.IsCorrect == true)
            {
                user.Money++;
                await _context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                user.Money++;
                await _context.SaveChangesAsync();
                return BadRequest();
            }
        }
    }
}