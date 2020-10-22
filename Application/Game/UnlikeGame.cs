using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Middlewares.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;
using Support.Security.UserAccess;

namespace Application.Game
{
    public class UnlikeGame
    {
        public class Command : IRequest
        {
            public int GameId { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUser());
                
                if(user == null)
                    throw new RestException(HttpStatusCode.NotFound, new {user = "Not found"});

                var game = await _context.Games.SingleOrDefaultAsync(x => x.Id == request.GameId);
                
                if(game == null)
                    throw new RestException(HttpStatusCode.NotFound, new {game = "Not found"});
                
                // check if user has liked the game already
                if (!user.LikedGames.Any(x => x.Id == game.Id))
                {
                    throw new RestException(HttpStatusCode.BadRequest, new {game = "You havent liked this game"});
                }

                user.LikedGames.Remove(game);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}