using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Middlewares.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;
using Support.General;
using Support.Services;

namespace Application.Game
{
    public class SearchGameByName
    {
        public class Query : IRequest<PagedResponse<List<AllGamesDto>>>
        {
            public string GameName { get; set; }
            public string Route { get; set; }
            public PaginationFilter PaginationFilter { get; set; }
        }


        public class Handler : IRequestHandler<Query, PagedResponse<List<AllGamesDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUriService _uriService;

            public Handler(DataContext context, IMapper mapper, IUriService uriService)
            {
                _context = context;
                _mapper = mapper;
                _uriService = uriService;
            }

            public async Task<PagedResponse<List<AllGamesDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                
                var validFilter = new PaginationFilter(request.PaginationFilter.PageNumber, request.PaginationFilter.PageSize);

                if (string.IsNullOrEmpty(request.GameName))
                {
                    throw new RestException(HttpStatusCode.BadRequest, new {game = "Please input a valid game name"});
                }

                var games = await _context.Games.Where(x => x.Name.Contains(request.GameName))
                    .Skip((validFilter.PageNumber - 1) * validFilter.PageSize).Take(validFilter.PageSize).ToListAsync();

                var totalRecords =  await _context.Games.CountAsync(x => x.Name.Contains(request.GameName));

                var pagedResponse = PaginationHelper.CreatePagedReponse<AllGamesDto>(
                    _mapper.Map<List<AllGamesDto>>(games), validFilter, totalRecords, _uriService, request.Route);

                return pagedResponse;
            }
        }
    }
}