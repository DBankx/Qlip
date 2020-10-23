using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Middlewares.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;
using Support.Security.UserAccess;

namespace Application.Clip
{
    public class DislikeClip
    {
        public class Command : IRequest
        {
            public string ClipId { get; set; }
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
                    throw new RestException(HttpStatusCode.BadRequest);

                var clip = await _context.Clips.SingleOrDefaultAsync(x => x.Id == request.ClipId);

                if (clip == null)
                    throw new RestException(HttpStatusCode.NotFound, new {clip = "Not found"});
                
                // find if user has liked the clip
                var like = await _context.UserClips.SingleOrDefaultAsync(x =>
                    x.ApplicationUserId == user.Id && x.ClipId == clip.Id);

                if (like == null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new {clip = "You havent liked the clip yet"});
                }

                _context.UserClips.Remove(like);
                clip.Dislikes++;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}