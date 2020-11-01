using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Middlewares.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Clip
{
    /// <summary>
    /// Api handler for updating a video.
    /// Users can only update the description and title of the video.
    /// </summary>
    public class UpdateClip
    {
        public class Command : IRequest
        {
            public string ClipId { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var clip = await _context.Clips.SingleOrDefaultAsync(x => x.Id == request.ClipId);

                if (clip == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new {clip = "Not found"});
                }

                clip.Description = request.Description;
                clip.Title = request.Title;
                clip.CreatedAt = DateTime.Now;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}