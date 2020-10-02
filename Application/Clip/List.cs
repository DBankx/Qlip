using System.Collections.Generic;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
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
        public class Query : IRequest<List<Domain.Clip>>
        {
        }


        public class Handler : IRequestHandler<Query, List<Domain.Clip>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Domain.Clip>> Handle(Query request, CancellationToken cancellationToken)
            {
                var clips = await _context.Clips.ToListAsync();

                return clips;
            }
        }
    }
}