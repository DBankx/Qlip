using System.Collections.Generic;
using Application.Clip;

namespace Application.Game
{
    public class GameDto
    {
        public int Id { get; set; }
        public string Slug { get; set; }
        public string Name { get; set; }
        public string Released { get; set; }
        public string Background_Image { get; set; }
        public string Rating { get; set; }
        public int Playtime { get; set; }
        public virtual ICollection<AllClipsDto> Clips { get; set; }
    }
}