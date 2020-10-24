using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Middlewares.Errors;
using Application.Clip;
using Application.Game;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Channel
{
    public class Details
    {
        public class Query : IRequest<Channel>
        {
            public string Username { get; set; }
        }


        public class Handler : IRequestHandler<Query, Channel>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Channel> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.Username);
                
                if(user == null)
                    throw new RestException(HttpStatusCode.NotFound, new {user = "Not found"});

                var queryable = _context.UserClips.AsQueryable();

                var likedClipsId = new List<Domain.UserClip>();

                var clips = new List<Domain.Clip>();

                likedClipsId = await queryable.Where(x => x.ApplicationUserId == user.Id).ToListAsync();

                foreach (var clip in likedClipsId)
                {
                    clips.Add(await _context.Clips.SingleOrDefaultAsync(x => x.Id == clip.ClipId));
                }
                
                return new Channel
                {
                    Bio = user.Bio,
                    CreatedAt = user.CreatedAt,
                    GravatarProfileImage = user.GravatarProfileImage,
                    Twitch = user.Twitch,
                    Instagram = user.Instagram,
                    Twitter = user.Twitter,
                    Youtube = user.Youtube,
                    Username = user.UserName,
                    Clips = _mapper.Map<List<ClipDto>>(user.Clips),
                    OverallViews = user.Clips.Sum(x => x.views),
                    LikedGames = _mapper.Map<List<AllGamesDto>>(user.LikedGames),
                    LikedClips = _mapper.Map<List<ClipDto>>(clips)
                };
                
            }
        }
    }
}