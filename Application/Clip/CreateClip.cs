using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Middlewares.Errors;
using CloudinaryDotNet;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistance;
using Support.Video;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Application.Clip
{
    public class CreateClip
    {
        /// <summary>
        /// Api command request for creating a clip
        /// </summary>
        public class Command : IRequest<Domain.Clip>
        {
            public string Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Url { get; set; }
            public string GameName { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotNull().NotEmpty().MinimumLength(3);
                RuleFor(x => x.GameName).NotNull().NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Domain.Clip>
        {
            private readonly DataContext _context;
            private readonly IVideoAccessor _videoAccessor;
            private readonly IConfiguration _config;
            public readonly Cloudinary _Cloudinary;

            public Handler(DataContext context, IVideoAccessor videoAccessor, IConfiguration config)
            {
                _context = context;
                _videoAccessor = videoAccessor;
                _config = config;
                _Cloudinary =  new Cloudinary(config["cloudinary"]);
            }

            public async Task<Domain.Clip> Handle(Command request, CancellationToken cancellationToken)
            {
                // create a new clip instance using the request
                var clip = new Domain.Clip
                {
                    Id = request.Id,
                    Url = request.Url,
                    Title = request.Title,
                    Description = request.Description,
                    CreatedAt = DateTime.Now,
                };
                
                // find the game and add it to the games

                var game = await _context.Games.SingleOrDefaultAsync(x => x.Name == request.GameName);

                if (game == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new {game = "The requested game was not found"});
                }

                clip.Game = game;

                _context.Clips.Add(clip);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return clip;
                throw new Exception("Problem saving changes");
            }
        }
    }
}