using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistance;
using Support.Video;

namespace Application.Clip
{
    public class UploadClip
    {
        public class Command : IRequest<VideoUploadResult>
        {
            public IFormFile VideoFile { get; set; }
        }

        public class Handler : IRequestHandler<Command, VideoUploadResult>
        {
            private readonly IVideoAccessor _videoAccessor;

            public Handler( IVideoAccessor videoAccessor)
            {
                _videoAccessor = videoAccessor;
            }

            public async Task<VideoUploadResult> Handle(Command request, CancellationToken cancellationToken)
            {
                var videoUploadResult = await _videoAccessor.UploadClip(request.VideoFile);

                return videoUploadResult;
                
            }
        }
    }
}