using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Middlewares.Errors;
using AutoMapper;
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
        public class Query : IRequest<ClipDto>
        {
            public string ClipId { get; set; }
        }


        public class Handler : IRequestHandler<Query, ClipDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<ClipDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var clip = await _context.Clips.SingleOrDefaultAsync(x => x.Id == request.ClipId);

                if (clip == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new {clip = "Not found"});
                }

                // increment the views everytime this endpoint is reached
                clip.views++;
                

                await _context.SaveChangesAsync();

                return _mapper.Map<ClipDto>(clip);
            }
        }
    }
}