namespace Application.Channel
{
    public class ChannelFollowDto
    {
        public string GravatarProfileImage { get; set; }
        public int SubscriberCount { get; set; }
        public string Username { get; set; }
        public bool SubscribedToChannel { get; set; }
    }
}