using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using be.Model.Entity;
using Microsoft.EntityFrameworkCore;

namespace be.Context
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<User> User { get; set; }
    }
}