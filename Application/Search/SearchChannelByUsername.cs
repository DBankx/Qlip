using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Middlewares.Errors;
using Application.Channel;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;
using Support.General;
using Support.Services;

namespace Application.Search
{
    public class SearchChannelByUsername
    {
        public class Query : IRequest<PagedResponse<List<ChannelFollowDto>>>
        {
            public string Username { get; set; }
            public PaginationFilter PaginationFilter { get; set; }
            public string Route { get; set; }
        }

        public class Handler : IRequestHandler<Query, PagedResponse<List<ChannelFollowDto>>>
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
            
            public async Task<PagedResponse<List<ChannelFollowDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var validFilter = new PaginationFilter(request.PaginationFilter.PageNumber, request.PaginationFilter.PageSize);

                if (string.IsNullOrEmpty(request.Username))
                {
                    throw new RestException(HttpStatusCode.BadRequest, new {username = "Please input a valid username"});
                }
                
                var channels = await _context.Users.Where(x => x.UserName.Contains(request.Username)).Skip((validFilter.PageNumber - 1) * validFilter.PageSize).Take(validFilter.PageSize).ToListAsync();
                

               var totalRecords = await _context.Users.CountAsync(x => x.UserName.Contains(request.Username));

                var pagedResponse = PaginationHelper.CreatePagedReponse<ChannelFollowDto>(_mapper.Map<List<ChannelFollowDto>>(channels), validFilter,
                                   totalRecords, _uriService, request.Route);
               
                return pagedResponse;                
            }
        }
    }
}