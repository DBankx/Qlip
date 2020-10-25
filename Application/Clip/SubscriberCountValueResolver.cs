using AutoMapper;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistance;
using Support.Security.UserAccess;

namespace Application.Clip
{
    public class SubscriberCountValueResolver : IValueResolver<Domain.Clip, ClipDto, int>
    {
        private readonly DataContext _context;

        public SubscriberCountValueResolver( DataContext context)
        {
            _context = context;
        }
        
        public int Resolve(Domain.Clip source, ClipDto destination, int destMember, ResolutionContext context)
        {
            return _context.Followings.CountAsync(x => x.TargetId == source.ApplicationUser.Id).Result;
        }
    }
}