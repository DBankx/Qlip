using System.Linq;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Clip
{
    public class ClipDislikeReslover : IValueResolver<Domain.Clip, ClipDto, int>
    {
        private readonly DataContext _context;

        public ClipDislikeReslover(DataContext context)
        {
            _context = context;
        }
        
        public int Resolve(Domain.Clip source, ClipDto destination, int destMember, ResolutionContext context)
        {
            return _context.DislikeUserClips.CountAsync(x => x.ClipId == source.Id).Result;
        }
    }
}