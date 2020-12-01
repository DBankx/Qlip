using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Middlewares.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistance;
using Support.Video;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Support.Security.UserAccess;

namespace Application.Clip
{
    public class CreateClip
    {
        /// <summary>
        /// Api command request for creating a clip
        /// </summary>
        public class Command : IRequest<ClipDto>
        {
            public string Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Url { get; set; }
            public string GameName { get; set; }
            public string Thumbnail { get; set; }
            public double Duration { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotNull().NotEmpty().MinimumLength(3);
                RuleFor(x => x.GameName).NotNull().NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, ClipDto>
        {
            private readonly DataContext _context;
            private readonly IVideoAccessor _videoAccessor;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IVideoAccessor videoAccessor, IUserAccessor userAccessor, IMapper mapper)
            {
                _context = context;
                _videoAccessor = videoAccessor;
                _userAccessor = userAccessor;
                _mapper = mapper;
            }

            public async Task<ClipDto> Handle(Command request, CancellationToken cancellationToken)
            {
                // create a new clip instance using the request
                var clip = new Domain.Clip
                {
                    Id = request.Id,
                    Url = request.Url,
                    Title = request.Title,
                    Description = request.Description,
                    CreatedAt = DateTime.Now,
                    Thumbnail = request.Thumbnail,
                    Duration = request.Duration
                };
                
                // get the user
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUser());
                
                if(user == null)
                    throw new RestException(HttpStatusCode.NotFound, new {user = "Not found"});

                clip.ApplicationUser = user;
                
                // find the game and add it to the games
                var game = await _context.Games.SingleOrDefaultAsync(x => x.Name.Equals(request.GameName, StringComparison.OrdinalIgnoreCase));

                if (game == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new {game = "The requested game was not found"});
                }

                clip.Game = game;
                
                // add a new view
                var view = new View
                {
                    User = user,
                    Clip = clip
                };
                
                _context.Clips.Add(clip);
                
                user.Clips.Add(clip);

                _context.Views.Add(view);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return _mapper.Map<ClipDto>(clip);
                throw new Exception("Problem saving changes");
            }
        }
    }
}