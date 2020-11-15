using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Clip;
using AutoMapper;
using Domain;
using MediatR;
using Persistance;
using Support.General;
using Support.Services;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Application.Search
{
    public class SearchClipByGameName
    {
        public class Query : IRequest<PagedResponse<List<ClipDto>>>
        {
            public string GameName { get; set; }
            public PaginationFilter PaginationFilter { get; set; }
            public string Route { get; set; }
        }


        public class Handler : IRequestHandler<Query, PagedResponse<List<ClipDto>>>
        {
            private readonly DataContext _context;
            private readonly IUriService _uriService;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IUriService uriService, IMapper mapper)
            {
                _context = context;
                _uriService = uriService;
                _mapper = mapper;
            }

            public async Task<PagedResponse<List<ClipDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
 var validFilter = new PaginationFilter(request.PaginationFilter.PageNumber, request.PaginationFilter.PageSize);

 var game = await _context.Games.SingleOrDefaultAsync(x => string.Equals(x.Name, request.GameName));
                                
                var clips = await _context.Clips.Where(x => x.Game == game).Skip((validFilter.PageNumber - 1) * validFilter.PageSize).Take(validFilter.PageSize).ToListAsync();

                var totalRecords = 0; 

                var pagedResponse = PaginationHelper.CreatePagedReponse<ClipDto>(_mapper.Map<List<ClipDto>>(clips), validFilter,
                                   totalRecords, _uriService, request.Route);
               
                return pagedResponse;
                 
            }
        }
    }
}