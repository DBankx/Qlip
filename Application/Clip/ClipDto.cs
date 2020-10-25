using System;
using System.Text.Json.Serialization;

namespace Application.Clip
{
    public class ClipDto
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public int views { get; set; }
        public string GameName { get; set; }
        public string AuthorName { get; set; }
        public string AuthorImage { get; set; }
        public int AuthorSubscriberCount { get; set; }
        public bool SubscribedToAuthor { get; set; }
        public int Likes { get; set; }
        public int Dislikes { get; set; }
        public bool IsLiked { get; set; }
        public bool IsDisliked { get; set; }
    }
}