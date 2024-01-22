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
        public QuestionController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("CreateQuestion")]
        public async Task<ActionResult> CreateQuestion([FromBody] QuestionCreateInputDto input)
        {
            var user = await _context.User.SingleOrDefaultAsync(u => u.Username == input.Username);
            if (user == null) return BadRequest(new {message = "User not found!"});
            if (user.IsAdmin != false ) return BadRequest(new {message = "User not found!"});
            else
            {
                var newQuestion = new Questions
                {
                    Quest = input.Quest,
                };
                _context.Questions.Add(newQuestion);
                await _context.SaveChangesAsync();
            }
            return Ok(new {message = "Create Question successfully!"});
        }
        [HttpDelete("DeleteQuestion")]
        public async Task<ActionResult> EditQuestion([FromBody] QuestionDeleteInputDto input)
        {
            var user = await _context.User.SingleOrDefaultAsync(u => u.Username == input.Username);
            if (user == null) return BadRequest(new {message = "User not found!"});
            if (user.IsAdmin != false ) return BadRequest(new {message = "User not found!"});
            var question = await _context.Questions.SingleOrDefaultAsync(q => q.QuestionId == input.QuestionId);
            if (question == null) return NotFound(new {message = "Question not found!"});
            else
            {
                _context.Questions.Remove(question);
                await _context.SaveChangesAsync();
            }
            return Ok(new {message = "Delete Question successfully!"});
        }
    }
}