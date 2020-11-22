using System;

namespace Application.Clip
{
    public class HistoryClipsDto
    {
        public string Id { get; set; }
                public string Title { get; set; }
                public int Views { get; set; }
                public string AuthorName { get; set; }
                public string AuthorImage { get; set; }
                public string Thumbnail { get; set; }
                public DateTime CreatedAt { get; set; }
                public DateTime WatchedAt { get; set; }
    }
}