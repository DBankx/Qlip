using System.Linq;
using AutoMapper;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Clip
{
    public class ClipLikeResolver : IValueResolver<Domain.Clip, ClipDto, int>
    {
        private readonly DataContext _context;

        public ClipLikeResolver(DataContext context)
        {
            _context = context;
        }
        
        public int Resolve(Domain.Clip source, ClipDto destination, int destMember, ResolutionContext context)
        {
            return  _context.UserClips.CountAsync(x => x.ClipId == source.Id).Result;
        }
    }
}