using System;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Persistance;
using Support.Security.UserAccess;

namespace Application.Clip
{
    public class IsSubscribedResolver : IValueResolver<Domain.Clip, ClipDto, bool>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public IsSubscribedResolver(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }
        
        public bool Resolve(Domain.Clip source, ClipDto destination, bool destMember, ResolutionContext context)
        {
            var loggedInUser = _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUser()).Result;

            if (loggedInUser == null)
                return false;

            if (loggedInUser.Id == source.Id)
                return false;
            
            var follow = _context.Followings.SingleOrDefaultAsync(x =>
                x.ObserverId == loggedInUser.Id && x.TargetId == source.ApplicationUser.Id).Result;

            if (follow != null)
            {
                return true;
            }

            return false;
        }
    }
}