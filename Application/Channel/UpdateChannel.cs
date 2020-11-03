using System;
using System.Net;
using System.Security.Cryptography.X509Certificates;
using System.Threading;
using System.Threading.Tasks;
using Api.Middlewares.Errors;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
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
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly UserManager<ApplicationUser> _userManager;

            public Handler(DataContext context, IUserAccessor userAccessor, UserManager<ApplicationUser> userManager)
            {
                _context = context;
                _userAccessor = userAccessor;
                _userManager = userManager;
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

                if (await _context.Users.AnyAsync(x => x.UserName == request.Username))
                {
                    throw new RestException(HttpStatusCode.BadRequest, new {username = "Username already exists"});
                }

                user.UserName = request.Username ?? user.UserName;

                await _userManager.UpdateAsync(user);
                
                var success = await _context.SaveChangesAsync() > 0;
                
                if(success) return Unit.Value;
                
                throw new Exception("Problem saving changes");

            }
        }
    }
}