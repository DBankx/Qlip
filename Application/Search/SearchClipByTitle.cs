using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Middlewares.Errors;
using Application.Clip;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;
using Support.General;
using Support.Services;

namespace Application.Search
{
    public class SearchClipByTitle
    {
        public class Query : IRequest<PagedResponse<List<AllClipsDto>>>
        {
            public string Title { get; set; }
            public PaginationFilter PaginationFilter { get; set; }
            public string Route { get; set; }
        }


        public class Handler : IRequestHandler<Query, PagedResponse<List<AllClipsDto>>>
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

            public async Task<PagedResponse<List<AllClipsDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var validFilter = new PaginationFilter(request.PaginationFilter.PageNumber, request.PaginationFilter.PageSize);
                                
                                
                if (string.IsNullOrEmpty(request.Title))
                {
                    throw new RestException(HttpStatusCode.BadRequest, new {search = "Please input a valid title"});
                }

                var clips = await _context.Clips.Where(x => x.Title.Contains(request.Title)).Skip((validFilter.PageNumber - 1) * validFilter.PageSize).Take(validFilter.PageSize).ToListAsync();

                var totalRecords = await _context.Clips.CountAsync(x => x.Title.Contains(request.Title)); 

                var pagedResponse = PaginationHelper.CreatePagedReponse<AllClipsDto>(_mapper.Map<List<AllClipsDto>>(clips), validFilter,
                                   totalRecords, _uriService, request.Route);
               
                return pagedResponse;
            }
        }
    }
}