using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Persistance;
using Support.Security.UserAccess;

namespace Application.Clip
{
    public class IsWatchedResolver : IValueResolver<Domain.Clip, AllClipsDto, bool>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public IsWatchedResolver(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }
        public bool Resolve(Domain.Clip source, AllClipsDto destination, bool destMember, ResolutionContext context)
        {
            var user =  _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUser()).Result;

            if (user == null)
            {
                return false;
            }
            
            // check if user has viewed the clip
            var view = _context.Views.SingleOrDefaultAsync(x => x.ApplicationUserId == user.Id && x.ClipId == source.Id)
                .Result;

            if (view == null)
            {
                return false;
            }

            return true;

        }
    }
}