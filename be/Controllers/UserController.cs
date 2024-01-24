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
    public class UserController : BaseApiController
    {
        private readonly DataContext _context;
        public UserController(DataContext context)
        {
            _context = context;
        }

        private async Task<bool> UserExists(string Username)
        {
            return await _context.User.AnyAsync(x => x.Username == Username.ToLower());
        }

        [HttpPost("Register")]
        public async Task<ActionResult> Register([FromBody] UserRegisterInputDto input)
        {
            if (await UserExists(input.Username))
            {
                return BadRequest(new {message = "Username already in use!"});
            }
            var newUser = new User()
                {
                    Username = input.Username.ToLower(),
                    Password = input.Password,
                    Link = input.Link,
                    IsAdmin = false,
                };
            _context.User.Add(newUser);
            await _context.SaveChangesAsync();
            return Ok(new {message = "Register successfully"});
        }

        [HttpPost("Login")]
        public async Task<ActionResult<UserLoginOutputDto>> Login([FromBody] UserLoginInputDto input)
        {
            var user = await _context.User.SingleOrDefaultAsync(u => u.Username == input.Username);
            if (user == null) return BadRequest(new {message = "User not found!"});
            if (input.Password != user.Password) return BadRequest(new {message = "Wrong password, please check again!"});
            else return Ok(new UserLoginOutputDto()
            {
                Username = user.Username,
                IsAdmin = user.IsAdmin,
            });
        }
    }
}
