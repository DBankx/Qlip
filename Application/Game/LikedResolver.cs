using System.Linq;
using AutoMapper;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistance;
using Support.Security.UserAccess;

namespace Application.Game
{
    /// <summary>
    /// Check if a user is liking a game
    /// </summary>
    public class LikedResolver : IValueResolver<Domain.Game, AllGamesDto, bool>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public LikedResolver(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }
        public bool Resolve(Domain.Game source, AllGamesDto destination, bool destMember, ResolutionContext context)
        {
            var currentUser =
                _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUser()).Result;
            if (currentUser == null)
            {
                return false;
            }
            if (currentUser.LikedGames.Any(x => x.Id == source.Id))
            {
                return true;
            }

            return false;
        }
    }
}