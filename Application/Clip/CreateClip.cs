using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistance;
using Support.Video;
using FluentValidation;

namespace Application.Clip
{
    public class CreateClip
    {
        /// <summary>
        /// Api command request for creating a clip
        /// </summary>
        public class Command : IRequest<Domain.Clip>
        {
            public IFormFile videoFile { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotNull().NotEmpty().MinimumLength(3);
            }
        }

        public class Handler : IRequestHandler<Command, Domain.Clip>
        {
            private readonly DataContext _context;
            private readonly IVideoAccessor _videoAccessor;

            public Handler(DataContext context, IVideoAccessor videoAccessor)
            {
                _context = context;
                _videoAccessor = videoAccessor;
            }

            public async Task<Domain.Clip> Handle(Command request, CancellationToken cancellationToken)
            {
                var videoUploadResult = _videoAccessor.UploadClip(request.videoFile);

                // create a new clip instance using the request
                var clip = new Domain.Clip
                {
                    Id = videoUploadResult.PublicId,
                    Url = videoUploadResult.Url,
                    Title = request.Title,
                    Description = request.Description,
                    CreatedAt = DateTime.Now
                };

                _context.Clips.Add(clip);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return clip;
                throw new Exception("Problem saving changes");
            }
        }
    }
}