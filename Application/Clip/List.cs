using System.Collections.Generic;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Clip
{
    /// <summary>
    /// mediatr handler to get all the clips form the databse
    /// </summary>
    public class List
    {
        public class Query : IRequest<List<ClipDto>>
        {
        }


        public class Handler : IRequestHandler<Query, List<ClipDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<ClipDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var clips = await _context.Clips.ToListAsync();

                return _mapper.Map<List<Domain.Clip>, List<ClipDto>>(clips);
            }
        }
    }
}