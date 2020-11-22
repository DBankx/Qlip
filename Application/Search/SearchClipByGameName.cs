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
using Support.Security.UserAccess;

namespace Application.Search
{
    public class SearchClipByGameName
    {
        public class Query : IRequest<PagedResponse<List<AllClipsDto>>>
        {
            public string GameName { get; set; }
            public PaginationFilter PaginationFilter { get; set; }
            public string Route { get; set; }
        }


        public class Handler : IRequestHandler<Query, PagedResponse<List<AllClipsDto>>>
        {
            private readonly DataContext _context;
            private readonly IUriService _uriService;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUriService uriService, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _uriService = uriService;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<PagedResponse<List<AllClipsDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
 var validFilter = new PaginationFilter(request.PaginationFilter.PageNumber, request.PaginationFilter.PageSize);

 var game = await _context.Games.SingleOrDefaultAsync(x => string.Equals(x.Name, request.GameName));

 var clips = new List<Domain.Clip>();

 var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUser());

 if (user == null)
 { 
     clips = await _context.Clips.Where(x => x.Game == game).Skip((validFilter.PageNumber - 1) * validFilter.PageSize)
         .Take(validFilter.PageSize).ToListAsync();
 }
 else
 {
     var clipIdsTheUserWatched = _context.Views.Where(x => x.ApplicationUserId == user.Id).Select(x => x.ClipId);
     clips = await _context.Clips.Where(x => !(clipIdsTheUserWatched.Contains(x.Id)) && x.Game == game).ToListAsync();
 }
 
 var totalRecords = clips.Count; 

                var pagedResponse = PaginationHelper.CreatePagedReponse<AllClipsDto>(_mapper.Map<List<AllClipsDto>>(clips), validFilter,
                                   totalRecords, _uriService, request.Route);
               
                return pagedResponse;
                 
            }
        }
    }
}