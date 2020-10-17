﻿using System;
using System.Collections.Generic;
using Application.Clip;

namespace Application.Channel
{
    public class Channel
    {
        public string GravatarProfileImage { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Bio { get; set; }
        public string Twitter { get; set; }
        public string Instagram { get; set; }
        public string Youtube { get; set; }
        public string Twitch { get; set; }
        public ICollection<ClipDto> Clips { get; set; }
        public int OverallViews { get; set; }
        public string Username { get; set; }
    }
}