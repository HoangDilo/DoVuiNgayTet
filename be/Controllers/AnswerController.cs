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
        public async Task<List<AnswerRandomOutputDto>> AnswerByQuestionId(long QuestionId)
        {
            var answer = await (from Answer in _context.Answer
            where Answer.QuestionId == QuestionId
            select new AnswerRandomOutputDto()
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
        if (user == null) return BadRequest(new { message = "User not found!" });
        if (user.IsAdmin == false) return BadRequest(new { message = "User is not an admin!" });
        var answerToEdit = await _context.Answer.SingleOrDefaultAsync(a => a.AnswerId == input.AnswerId);
        if (answerToEdit == null)
        {
            return BadRequest(new { message = "Answer not found!" });
        }
        var otherAnswers = await _context.Answer
            .Where(a => a.QuestionId == answerToEdit.QuestionId)
            .ToListAsync();
        answerToEdit.AnswerText = input.AnswerText;
        if (answerToEdit.IsCorrect == false && input.IsCorrect == false)
        {
            answerToEdit.AnswerText = input.AnswerText;
        }
        else if (answerToEdit.IsCorrect == false && input.IsCorrect == true)
        {
            foreach (var answer in otherAnswers)
            {
                if (answer.AnswerId == input.AnswerId)
                {
                    if(answer.IsCorrect == false && input.IsCorrect == true)
                    {
                        answer.IsCorrect = input.IsCorrect;
                    }
                    else if (answer.IsCorrect == false && input.IsCorrect == false)
                    {
                        answer.IsCorrect = input.IsCorrect;
                    }
                    else if (answer.IsCorrect == true && input.IsCorrect == true)
                    {
                        answer.IsCorrect = input.IsCorrect;
                    }
                    else if (answer.IsCorrect == true && input.IsCorrect == false)
                    {
                        return BadRequest(new { message = "Invalid" });
                    }
                }
                else
                {
                    answer.IsCorrect = false;
                }
            }
        }
        await _context.SaveChangesAsync();
        return Ok(new { message = "Edit Answer successfully!"});
        }
    }
}