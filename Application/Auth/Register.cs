using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Middlewares.Errors;
using Domain;
using FluentValidation;
using GravatarSharp.Core;
using GravatarSharp.Core.Model;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistance;
using Support.Security.Jwt;

namespace Application.Auth
{
    public class Register
    {
        public class Command : IRequest<UserReturnObject>
        {
            public string Email { get; set; }
            public string Password { get; set; }
            public string Gender { get; set; }
            public string Username { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
                RuleFor(x => x.Username).NotEmpty().MinimumLength(2);
                RuleFor(x => x.Gender).NotEmpty();
                RuleFor(x => x.Password).NotEmpty().MinimumLength(6).WithMessage("Passwords must not be less than 6 chars").Matches("[A-Z]").WithMessage("Password must contain 1 uppercase letter").Matches("[a-z]").WithMessage("Password must have at least 1 lowercase char").Matches("[0-9]").WithMessage("Password contains at least one number").Matches("[^a-zA-Z0-9]").WithMessage("Password must contain non Alphanumeric");
            }
        }

        public class Handler : IRequestHandler<Command, UserReturnObject>
        {
            private readonly DataContext _context;
            private readonly UserManager<ApplicationUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;

            public Handler(DataContext context, UserManager<ApplicationUser> userManager, IJwtGenerator jwtGenerator)
            {
                _context = context;
                _userManager = userManager;
                _jwtGenerator = jwtGenerator;
            }

            public async Task<UserReturnObject> Handle(Command request, CancellationToken cancellationToken)
            {
                if (await _context.Users.AnyAsync(x => x.UserName == request.Username))
                {
                    throw new RestException(HttpStatusCode.BadRequest, new {username = "Username already in use"});
                }

                if (await _context.Users.AnyAsync(x => x.Email == request.Email))
                {
                    throw new RestException(HttpStatusCode.BadRequest, new {email = "Email already in use"});
                }
                
                var user = new ApplicationUser
                {
                    Email = request.Email,
                    Gender = request.Gender,
                    UserName = request.Username,
                    GravatarProfileImage = GravatarController.GetImageUrl(request.Email),
                    CreatedAt = DateTime.Now
                };
                

                var result = await _userManager.CreateAsync(user, request.Password);

                if (result.Succeeded)
                {
                    return new UserReturnObject
                    {
                        GravatarProfileImage = user.GravatarProfileImage,
                        Username = user.UserName,
                        Token = _jwtGenerator.GenerateToken(user),
                        Email = user.Email
                    };
                }

                throw new Exception("Problem saving changes");
            }
        }
    }
}