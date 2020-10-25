namespace Domain
{
    /// <summary>
    /// User following class to keep track of followings
    /// Observer - The person following ** The user logged in**
    /// Target - The person being followed
    /// </summary>
    public class UserFollowings
    {
        public string ObserverId { get; set; }
        public virtual ApplicationUser Observer { get; set; }
        public string TargetId { get; set; }
        public virtual ApplicationUser Target { get; set; }
    }
}