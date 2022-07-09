using Microsoft.EntityFrameworkCore;
using StepProject.DAL.Entities;

namespace StepProject.DAL
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
    }

}
