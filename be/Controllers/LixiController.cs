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
            if (user == null) return BadRequest(new { message = "User not found!" });
            if (user.Money == null)
            {
                return BadRequest();
            }
            else
            {
                var random = new Random();
                int randomMoney = 0;
                int randomIndex = random.Next(1000);
                if (randomIndex < 700)
                {
                    randomMoney = 1000;
                }
                else if (randomIndex < 950)
                {
                    randomMoney = 2000;
                }
                else if (randomIndex < 980)
                {
                    randomMoney = 5000;
                }
                else if (randomIndex < 990)
                {
                    randomMoney = 10000;
                }
                else if (randomIndex < 993)
                {
                    randomMoney = 20000;
                }
                else if (randomIndex < 996)
                {
                    randomMoney = 50000;
                }
                else if (randomIndex < 997)
                {
                    randomMoney = 100000;
                }
                else if (randomIndex < 998)
                {
                    randomMoney = 200000;
                }
                else
                {
                    randomMoney = 500000;
                }
                // user.Money = randomMoney;
                // await _context.SaveChangesAsync();
                return Ok(new { money = randomMoney, index = randomIndex });
            }
        }
    }
}