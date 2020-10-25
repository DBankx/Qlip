namespace Domain
{
    public class DislikeUserClip
    {
        public string ApplicationUserId { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
        public string ClipId { get; set; }
        public virtual Clip Clip { get; set; }
    }
}