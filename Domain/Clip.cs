using System;
using System.Collections.Generic;

namespace Domain
{
    public class Clip
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public int views { get; set; } = 0;
        public string Thumbnail { get; set; }
        public virtual Game Game { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
        public virtual ICollection<UserClip> UserClips { get; set; }
        public virtual ICollection<DislikeUserClip> DislikeUserClips { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
    }
}