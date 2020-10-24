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
        public DbSet<DislikeUserClip> DislikeUserClips{ get; set; }
        public DbSet<UserFollowings> Followings { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<UserClip>().HasKey(uc => new {uc.ClipId, uc.ApplicationUserId});

            modelBuilder.Entity<UserClip>().HasOne(au => au.ApplicationUser).WithMany(au => au.UserClips)
                .HasForeignKey(au => au.ApplicationUserId);

            modelBuilder.Entity<UserClip>().HasOne(c => c.Clip).WithMany(uc => uc.UserClips)
                .HasForeignKey(c => c.ClipId);

            modelBuilder.Entity<DislikeUserClip>().HasKey(duc => new {duc.ClipId, duc.ApplicationUserId});

            modelBuilder.Entity<DislikeUserClip>().HasOne(au => au.ApplicationUser).WithMany(au => au.DislikeUserClips)
                .HasForeignKey(au => au.ApplicationUserId);

            modelBuilder.Entity<DislikeUserClip>().HasOne(c => c.Clip).WithMany(c => c.DislikeUserClips)
                .HasForeignKey(c => c.ClipId);

            modelBuilder.Entity<UserFollowings>().HasKey(uf => new {uf.ObserverId, uf.TargetId});

            modelBuilder.Entity<UserFollowings>().HasOne(o => o.Observer).WithMany(uf => uf.Followings)
                .HasForeignKey(o => o.ObserverId);
            modelBuilder.Entity<UserFollowings>().HasOne(t => t.Target).WithMany(uf => uf.Followers)
                .HasForeignKey(t => t.TargetId);
        }
    }
}