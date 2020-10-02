using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Middlewares.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Clip
{
    public class Details
    {
        /// <summary>
        /// Api handler for getting a single clip by their unique identifier
        /// </summary>
        public class Query : IRequest<Domain.Clip>
        {
            public string ClipId { get; set; }
        }


        public class Handler : IRequestHandler<Query, Domain.Clip>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Domain.Clip> Handle(Query request, CancellationToken cancellationToken)
            {
                var clip = await _context.Clips.SingleOrDefaultAsync(x => x.Id == request.ClipId);

                if (clip == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new {clip = "Not found"});
                }

                return clip;
            }
        }
    }
}