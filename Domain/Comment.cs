using System;

namespace Domain
{
    public class Comment
    {
        public Guid Id { get; set; }
        public virtual ApplicationUser User { get; set; }
        public virtual Clip Clip { get; set; }
        public string Text { get; set; }
        public DateTime PostedAt { get; set; }
    }
}