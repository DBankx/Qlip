using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistance;
using Support.Video;

namespace Application.Clip
{
    public class DeleteUploadedClip
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
               var result =  _videoAccessor.DeleteClip(request.PublicId);
               
               if (result == null)
               {
                   throw new Exception("Problem deleting clip");
               }
               
               return Unit.Value;
            }
        }
    }
}