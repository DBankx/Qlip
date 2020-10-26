using AutoMapper;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistance;
using Support.Security.UserAccess;

namespace Application.Channel
{
    /// <summary>
    /// Reslover to check if the logged in user follows a user followers or following
    /// </summary>
    public class IsSubscribedValueResolver : IValueResolver<ApplicationUser, ChannelFollowDto, bool>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public IsSubscribedValueResolver(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }
        public bool Resolve(ApplicationUser source, ChannelFollowDto destination, bool destMember, ResolutionContext context)
        {
            var loggedInUser = _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUser()).Result;

            var checkingUser = _context.Users.SingleOrDefaultAsync(x => x.UserName == destination.Username).Result;

            if (loggedInUser == null)
                return false;

            if (_context.Followings
                    .SingleOrDefaultAsync(x => x.ObserverId == loggedInUser.Id && x.TargetId == checkingUser.Id)
                    .Result !=
                null)
            {
                return true;
            }

            return false;
        }
    }
}