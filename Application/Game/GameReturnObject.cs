using System.Collections.Generic;
using Application.Clip;

namespace Application.Game
{
    public class GameReturnObject
    {
        public Domain.Game Game { get; set; }
        public virtual ICollection<ClipDto> Clips { get; set; }
    }
}