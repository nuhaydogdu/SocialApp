using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ServerApp.Models;

namespace ServerApp.Data
{
    public class SocialContext : IdentityDbContext<User, Role, int> //bu şekilde belirtince DbSet olarak aşağıda yazmaya gerek kalmıyor (int classlarda id değelerinin int olarak tanımlanmasından kaynaklı)
    {
        public SocialContext(DbContextOptions<SocialContext> options) : base(options)
        {

        }

        public DbSet<Product> Products { get; set; }

        public DbSet<Image> Images { get; set; }

        public DbSet<UserToUser> UserToUser { get; set; }

        public DbSet<Message> Messages { get; set; }

        //FLUENT APİ YÖNTEMİNİ KULLANMAK İÇİN AŞAĞIDAKİ METHODU OVERRİDE ETTİK
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserToUser>()
            .HasKey(k => new { k.UserId, k.FollowerId });

            //bir User birden fazla Takipçiye sahip olabilecek
            builder.Entity<UserToUser>()
            .HasOne(l => l.User)
            .WithMany(a => a.Followers)
            .HasForeignKey(l => l.FollowerId);

            //bir takip eden kişi birden fazla hesabı takip edebilecek
            builder.Entity<UserToUser>()
            .HasOne(l => l.Follower)
            .WithMany(a => a.Followings)
            .HasForeignKey(l => l.UserId);

            builder.Entity<Message>()
            .HasOne(i => i.Sender)
            .WithMany(i => i.MessagesSent)
            .HasForeignKey(i => i.SenderId);

            builder.Entity<Message>()
            .HasOne(i => i.Recipient)
            .WithMany(i => i.MessagesReceived)
            .HasForeignKey(i => i.RecipientId);
        }
    }
}