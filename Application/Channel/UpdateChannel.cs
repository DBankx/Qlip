using System;
using System.Net;
using System.Security.Cryptography.X509Certificates;
using System.Threading;
using System.Threading.Tasks;
using Api.Middlewares.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;
using Support.Security.UserAccess;

namespace Application.Channel
{
    public class UpdateChannel
    {
        public class Command : IRequest
        {
            public string Bio { get; set; }
            public string Twitter { get; set; }
            public string Instagram { get; set; }
            public string Youtube { get; set; }
            public string Twitch { get; set; }
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

                user.Bio = request.Bio ?? user.Bio;
                user.Twitch = request.Twitch ?? user.Twitch;
                user.Twitter = request.Twitter ?? user.Twitter;
                user.Youtube = request.Youtube ?? user.Youtube;
                user.Instagram = request.Instagram ?? user.Instagram;

                var success = await _context.SaveChangesAsync() > 0;
                
                if(success) return Unit.Value;
                
                throw new Exception("Problem saving changes");

            }
        }
    }
}