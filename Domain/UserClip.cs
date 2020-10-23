using System;

namespace Domain
{
    public class UserClip
    {
        public string ApplicationUserId { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
        public string ClipId { get; set; }
        public virtual Clip Clip { get; set; }
    }
}