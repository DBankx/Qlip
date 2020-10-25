using System;
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

namespace Application.Follows
{
    public class List
    {
        public class Query : IRequest<List<ChannelFollowDto>>
        {
            public string Predicate { get; set; }
            public string Username { get; set; }
        }
        
        public class Handler : IRequestHandler<Query, List<ChannelFollowDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<List<ChannelFollowDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.Username);
                
                if(user == null)
                    throw new RestException(HttpStatusCode.NotFound);

                var queryable = _context.Followings.AsQueryable();

                var userFollowings = new List<UserFollowings>();
                var users = new List<ApplicationUser>();

                switch (request.Predicate)
                {
                    case("following"):
                        userFollowings = await queryable.Where(x => x.ObserverId == user.Id).ToListAsync();
                        foreach (var following in userFollowings)
                        {
                            users.Add(await _context.Users.SingleOrDefaultAsync(x => x.Id == following.TargetId));
                        }

                        break;
                    case("followers"):
                         userFollowings = await queryable.Where(x => x.TargetId == user.Id).ToListAsync();
                         foreach (var following in userFollowings)
                         {
                             users.Add(await _context.Users.SingleOrDefaultAsync(x => x.Id == following.ObserverId));
                         }
                         break;
                }

                return _mapper.Map<List<ChannelFollowDto>>(users);

            }
        }
    }
}