using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistance
{
    public class DataContext : IdentityDbContext<ApplicationUser>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }

        public DbSet<Clip> Clips { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<UserClip> UserClips { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<UserClip>().HasKey(uc => new {uc.ClipId, uc.ApplicationUserId});

            modelBuilder.Entity<UserClip>().HasOne(au => au.ApplicationUser).WithMany(au => au.UserClips)
                .HasForeignKey(au => au.ApplicationUserId);

            modelBuilder.Entity<UserClip>().HasOne(c => c.Clip).WithMany(uc => uc.UserClips)
                .HasForeignKey(c => c.ClipId);
        }
    }
}