using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Middlewares.Errors;
using Application.Clip;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Game
{
    public class Details
    {
        public class Query : IRequest<GameDto>
        {
            public int Id { get; set; }
        }


        public class Handler : IRequestHandler<Query, GameDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<GameDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var game = await _context.Games.SingleOrDefaultAsync(x => x.Id == request.Id);

                if (game == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new {game = "Not found"});
                }

                var listOfClips = await _context.Clips.Where(x => x.Game == game).ToListAsync();

                game.Clips = listOfClips;

                return _mapper.Map<GameDto>(game);

            }
        }
    }
}