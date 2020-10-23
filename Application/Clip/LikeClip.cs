using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Middlewares.Errors;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;
using Support.Security.UserAccess;

namespace Application.Clip
{
    public class LikeClip
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
                if (user == null)
                    throw new RestException(HttpStatusCode.BadRequest);

                var clip = await _context.Clips.SingleOrDefaultAsync(x => x.Id == request.ClipId);
                
                if(clip == null)
                    throw new RestException(HttpStatusCode.NotFound, new {clip = "Not found"});
                
                // check if user has liked the clip
                var likedClip =
                    await _context.UserClips.SingleOrDefaultAsync(x =>
                        x.ApplicationUserId == user.Id && x.ClipId == clip.Id);
                
                if(likedClip != null)
                    throw new RestException(HttpStatusCode.BadRequest, new {clip = "You already liked this clip"});

                var uc = new UserClip
                {
                    ApplicationUser = user,
                    Clip = clip
                };

                _context.UserClips.Add(uc);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}