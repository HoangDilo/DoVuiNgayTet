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
    public class AnswerController : BaseApiController
    {
        private readonly DataContext _context;
        public AnswerController(DataContext context)
        {
            _context = context;
        }
        [NonAction]
        public async Task<List<AnswerListOutputDto>> SearchByQuestionId(long QuestionId)
        {
            var answer = await (from Answer in _context.Answer
            where Answer.QuestionId == QuestionId
            select new AnswerListOutputDto()
            {
                AnswerId = Answer.AnswerId,
                AnswerText = Answer.AnswerText,
                IsCorrect = Answer.IsCorrect,
            }).ToListAsync();
            return answer;
        }
        
        [NonAction]
        public async Task<List<AnswerListOutputDto>> AnswerByQuestionId(long QuestionId)
        {
            var answer = await (from Answer in _context.Answer
            where Answer.QuestionId == QuestionId
            select new AnswerListOutputDto()
            {
                AnswerId = Answer.AnswerId,
                AnswerText = Answer.AnswerText,
            }).ToListAsync();
            return answer;
        }

        [HttpPut("EditAnswer")]
        public async Task<ActionResult> EditAnswer([FromBody] AnswerEditInputDto input)
        {
            var user = await _context.User.SingleOrDefaultAsync(u => u.Username == input.Username);
            if (user == null) return BadRequest(new {message = "User not found!"});
            if (user.IsAdmin == false ) return BadRequest(new {message = "User is not an admin!"});
            var answer = await _context.Answer.SingleOrDefaultAsync(a => a.AnswerText == input.AnswerText);
            if (string.IsNullOrWhiteSpace(input.AnswerText)) return BadRequest(new {message = "Invalid Text!"});
            else
            {
                answer.AnswerText = input.AnswerText;
                answer.IsCorrect = input.IsCorrect;
                await _context.SaveChangesAsync();
            }
            return Ok(new {message = "Edit Answer successfully!"});
        }
    }
}