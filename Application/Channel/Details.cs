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
using Support.Security.UserAccess;

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
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Channel> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.Username);
                var loggedInUser =
                    await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUser());
                
                
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

                var userClips = await _context.Clips.Where(x => x.ApplicationUser == user).ToListAsync();
               
                var channel =  new Channel
                {
                    Bio = user.Bio,
                    CreatedAt = user.CreatedAt,
                    GravatarProfileImage = user.GravatarProfileImage,
                    Twitch = user.Twitch,
                    Instagram = user.Instagram,
                    Twitter = user.Twitter,
                    Youtube = user.Youtube,
                    Username = user.UserName,
                    Clips = _mapper.Map<List<AllClipsDto>>(user.Clips),
                    LikedGames = _mapper.Map<List<AllGamesDto>>(user.LikedGames),
                    LikedClips = _mapper.Map<List<AllClipsDto>>(clips),
                    SubsrciberCount = user.Followers.Count(),
                 OverallViews =  userClips.Sum(x => x.Views.Count)
                };

                if (loggedInUser != null)
                {
                    var following = _context.Followings.Any(x =>
                            x.ObserverId == loggedInUser.Id && x.TargetId == user.Id);
                    channel.SubscribedToUser = following;
                }
                else
                {
                    channel.SubscribedToUser = false;
                }
                return channel;
            }
        }
    }
}