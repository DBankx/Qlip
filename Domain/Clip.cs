using System;

namespace Domain
{
    public class Clip
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Thumbnail { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public string GameName { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}