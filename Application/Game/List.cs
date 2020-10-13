using System.Collections.Generic;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Game
{
    public class List
    {
        public class Query : IRequest<List<Domain.Game>>
        {
        }


        public class Handler : IRequestHandler<Query, List<Domain.Game>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Domain.Game>> Handle(Query request, CancellationToken cancellationToken)
            {
                var games = await _context.Games.ToListAsync();

                return games;
            }
        }
    }
}