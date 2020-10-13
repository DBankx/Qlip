using System;

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
    }
}