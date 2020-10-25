using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Middlewares.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;
using Support.Security.UserAccess;

namespace Application.Follows
{
    public class UnSubscribe
    {
        public class Command : IRequest
        {
            public string Username { get; set; }
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
                var observer =
                                    await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUser());
                                
                                if(observer == null)
                                    throw new RestException(HttpStatusCode.NotFound, new {user = "Not found"});
                
                                var target = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.Username);
                                
                                if(target == null)
                                    throw new RestException(HttpStatusCode.NotFound, new {user = "target not found"});
                                
                //check if user is already following 
                var following =
                                    await _context.Followings.SingleOrDefaultAsync(x =>
                                        x.ObserverId == observer.Id && x.TargetId == target.Id);
                if (following == null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new {following = "You are not following this user"});
                }

                _context.Followings.Remove(following);
                
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }     
    }
}