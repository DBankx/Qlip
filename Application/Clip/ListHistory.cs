using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Middlewares.Errors;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;
using Support.Security.UserAccess;

namespace Application.Clip
{
    public class ListHistory
    {
        public class Query : IRequest<List<HistoryClipsDto>>
        {
        }


        public class Handler : IRequestHandler<Query, List<HistoryClipsDto>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _context = context;
                _userAccessor = userAccessor;
                _mapper = mapper;
            }

            public async Task<List<HistoryClipsDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUser());
                
                if(user == null)
                    throw new RestException(HttpStatusCode.NotFound, new {user = "not found"});

                var watched = await _context.Views.Where(x => x.User == user).Select(x => x.ClipId).ToListAsync();

                var userWatchedClips = await _context.Clips.Where(x => watched.Contains(x.Id)).ToListAsync();

                return _mapper.Map<List<HistoryClipsDto>>(userWatchedClips);

            }
        }
    }
}