using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Middlewares.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;
using Support.Video;

namespace Application.Clip
{
    public class DeleteClip
    {
        public class Command : IRequest
        {
            public string PublicId { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IVideoAccessor _videoAccessor;

            public Handler(DataContext context, IVideoAccessor videoAccessor)
            {
                _context = context;
                _videoAccessor = videoAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // ===== find the video from the database ========
                var clip = await _context.Clips.SingleOrDefaultAsync(x => x.Id == request.PublicId);

                if (clip == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new {clip = "Not Found"});
                }

                // delete the clip from clodinary using the found clip identifier
                var result = _videoAccessor.DeleteClip(clip.Id);

                if (result == null)
                {
                    throw new Exception("Problem deleting clip");
                }
                
                // delete clip from database
                _context.Clips.Remove(clip);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}