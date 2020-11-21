using System;
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
using Support.Security.UserAccess;

namespace Application.Clip
{
    public class Details
    {
        /// <summary>
        /// Api handler for getting a single clip by their unique identifier
        /// </summary>
        public class Query : IRequest<ClipDto>
        {
            public string ClipId { get; set; }
        }


        public class Handler : IRequestHandler<Query, ClipDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<ClipDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var clip = await _context.Clips.SingleOrDefaultAsync(x => x.Id == request.ClipId);

                if (clip == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new {clip = "Not found"});
                }

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUser());

                if (user != null)
                {
                    var view = await _context.Views.SingleOrDefaultAsync(x => x.Clip == clip && x.User == user);
                    if (view == null)
                    {
                        view = new View
                        {
                            User = user,
                            Clip = clip,
                            WatchedAt = DateTime.Now
                        };
                        _context.Views.Add(view);
                    }
                }

                await _context.SaveChangesAsync();

                return _mapper.Map<ClipDto>(clip);
            }
        }
    }
}