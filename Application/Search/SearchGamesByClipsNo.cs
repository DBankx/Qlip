using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Game;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;
using Support.General;
using Support.Services;

namespace Application.Search
{
    public class SearchGamesByClipNo
    {
        public class Query : IRequest<PagedResponse<List<AllGamesDto>>>
        {
            public PaginationFilter PaginationFilter { get; set; }
            public string Route { get; set; }
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
                // Get games with clips
                var games = await _context.Games.OrderByDescending(x => x.Clips.Count).Skip((validFilter.PageNumber - 1) * validFilter.PageSize).Take(validFilter.PageSize).ToListAsync();

                var totalRecords = await _context.Games.CountAsync();
                
                var pagedResponse = PaginationHelper.CreatePagedReponse<AllGamesDto>(_mapper.Map<List<AllGamesDto>>(games), validFilter,totalRecords, _uriService, request.Route);
                               
                return pagedResponse;

            }
        }
    }
}