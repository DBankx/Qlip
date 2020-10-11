using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Middlewares.Errors;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistance;
using Support.Security.Jwt;

namespace Application.Auth
{
    public class Login
    {
        public class Query : IRequest<UserReturnObject>
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class CommandValidator : AbstractValidator<Query>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
            }
        }


        public class Handler : IRequestHandler<Query, UserReturnObject>
        {
            private readonly DataContext _context;
            private readonly SignInManager<ApplicationUser> _signInManager;
            private readonly IJwtGenerator _jwtGenerator;

            public Handler(DataContext context, SignInManager<ApplicationUser> signInManager, IJwtGenerator jwtGenerator)
            {
                _context = context;
                _signInManager = signInManager;
                _jwtGenerator = jwtGenerator;
            }

            public async Task<UserReturnObject> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.Email == request.Email);

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.Unauthorized, new {error = "Invalid Credentials"});
                }

                var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

                if (result.Succeeded)
                {
                    return new UserReturnObject
                    {
                        Username = user.UserName,
                        GravatarProfileImage = user.GravatarProfileImage,
                        Token = _jwtGenerator.GenerateToken(user),
                        Email = user.Email
                    };
                }

                throw new RestException(HttpStatusCode.Unauthorized, new {error = "Invalid Credentials"});
            }
        }
    }
}