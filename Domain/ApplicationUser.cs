using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class ApplicationUser : IdentityUser
    {
        public string GravatarProfileImage { get; set; }
        public string Gender { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Bio { get; set; }
        public string Twitter { get; set; }
        public string Instagram { get; set; }
        public string Youtube { get; set; }
        public string Twitch { get; set; }
        public virtual ICollection<Domain.Clip> Clips { get; set; }
        public virtual ICollection<Game> LikedGames { get; set; }
        public virtual ICollection<UserClip> UserClips { get; set; }
        public virtual ICollection<DislikeUserClip> DislikeUserClips { get; set; }
    }
}