using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using be.Context;
using be.Model.Dto;
using be.Model.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace be.Controllers
{
    public class LixiController : BaseApiController
    {
        private readonly DataContext _context;
        public LixiController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("Lixi")]
        public async Task<ActionResult> Lixi([FromQuery] LixiInputDto input)
        {
            var user = await _context.User.SingleOrDefaultAsync(u => u.Username == input.Username);
            if (user == null) return BadRequest(new {message = "User not found!"});
            if(user.Money == null)
            {
                return BadRequest();
            }
            else
            {
                var random = new Random();
                int[] possibleMoney = { 5000, 10000, 20000, 40000, 50000 };
                int randomIndex = random.Next(possibleMoney.Length);
                int randomMoney = possibleMoney[randomIndex];
                user.Money = randomMoney;
            }
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}