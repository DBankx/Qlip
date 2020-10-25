using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Persistance;
using Support.Security.UserAccess;

namespace Application.Clip
{
    public class IsDislikedValueResolver : IValueResolver<Domain.Clip, ClipDto, bool>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public IsDislikedValueResolver(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }
        
            public bool Resolve(Domain.Clip source, ClipDto destination, bool destMember, ResolutionContext context)
            {
                var user = _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUser()).Result;

                if (user == null)
                    return false;
            
                var dislike = _context.DislikeUserClips.SingleOrDefaultAsync(x =>
                    x.ClipId == source.Id && x.ApplicationUserId == user.Id).Result;

                if (dislike != null)
                    return true;
            
                return false;
            }
        
        }
}