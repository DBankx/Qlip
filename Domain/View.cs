using System;

namespace Domain
{
    public class View
    {
        public string ApplicationUserId { get; set; }
        public virtual ApplicationUser User { get; set; }
        public string ClipId { get; set; }
        public virtual Clip Clip { get; set; }
        public DateTime WatchedAt { get; set; }
    }
}