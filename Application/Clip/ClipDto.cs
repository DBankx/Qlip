﻿using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Application.Comment;

namespace Application.Clip
{
    public class ClipDto
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public int Views { get; set; }
        public string GameName { get; set; }
        public string AuthorName { get; set; }
        public string AuthorImage { get; set; }
        public double Duration { get; set; }
        public int AuthorSubscriberCount { get; set; }
        public bool SubscribedToAuthor { get; set; }
        public string Thumbnail { get; set; }
        public int Likes { get; set; }
        public int Dislikes { get; set; }
        public bool IsLiked { get; set; }
        public bool IsDisliked { get; set; }
        public ICollection<CommentDto> Comments { get; set; }
    }
}