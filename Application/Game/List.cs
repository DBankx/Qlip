using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;
using Support.General;
using Support.Services;

namespace Application.Game
{
    public class List
    {
        public class Query : IRequest<PagedResponse<List<Domain.Game>>>
        {
            public PaginationFilter PaginationFilter { get; set; }
            public string Route { get; set; }
        }


        public class Handler : IRequestHandler<Query, PagedResponse<List<Domain.Game>>>
        {
            private readonly DataContext _context;
            private readonly IUriService _uriService;

            public Handler(DataContext context, IUriService uriService)
            {
                _context = context;
                _uriService = uriService;
            }

            public async Task<PagedResponse<List<Domain.Game>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var validFilter = new PaginationFilter(request.PaginationFilter.PageNumber, request.PaginationFilter.PageSize);
                
                var pagedData = await _context.Games.Skip((validFilter.PageNumber - 1) * validFilter.PageSize).Take(validFilter.PageSize).ToListAsync();

                var totalRecords = await _context.Games.CountAsync();

                var pagedResponse = PaginationHelper.CreatePagedReponse<Domain.Game>(pagedData, validFilter,
                    totalRecords, _uriService, request.Route);

                return pagedResponse;
            }
        }
    }
}