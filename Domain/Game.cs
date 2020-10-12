﻿using System.Collections.Generic;

namespace Domain
{
    /// <summary>
    /// Response object from rawg
    /// </summary>
    public class GameResponse
    {
        public int Count { get; set; }
        public string Next{ get; set; }
        public string Previous { get; set; }
        public IEnumerable<Game> Results { get; set; }    
    } 
    
    /// <summary>
    /// Game structure from rawg api
    /// </summary>
    public class Game
    {
        public int Id { get; set; }
        public string Slug { get; set; }
        public string Name { get; set; }
        public string Released { get; set; }
        public string Background_Image { get; set; }
        public string Rating { get; set; }
        public int Playtime { get; set; }
    }
}