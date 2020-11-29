using System;

namespace Application.Clip
{
    public class AllClipsDto
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public int Views { get; set; }
        public string AuthorName { get; set; }
        public string AuthorImage { get; set; }
        public bool IsWatched { get; set; }
        public string Thumbnail { get; set; }
        public DateTime CreatedAt { get; set; }
        public double Duration { get; set; }
    }
}