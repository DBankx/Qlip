using System;
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
using Support.Security.UserAccess;

namespace Application.Channel
{
    public class UpdatePassword
    {
        public class Command : IRequest
        {
            public string OldPassword { get; set; }
            public string NewPassword { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.NewPassword).NotEmpty().MinimumLength(6).WithMessage("Passwords must not be less than 6 chars").Matches("[A-Z]").WithMessage("Password must contain 1 uppercase letter").Matches("[a-z]").WithMessage("Password must have at least 1 lowercase char").Matches("[0-9]").WithMessage("Password contains at least one number").Matches("[^a-zA-Z0-9]").WithMessage("Password must contain non Alphanumeric");
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly UserManager<ApplicationUser> _userManager;

            public Handler(DataContext context, IUserAccessor userAccessor, UserManager<ApplicationUser> userManager)
            {
                _context = context;
                _userAccessor = userAccessor;
                _userManager = userManager;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(
                    x => x.UserName == _userAccessor.GetCurrentUser());
                
                if(user == null)
                    throw new RestException(HttpStatusCode.NotFound);

                var match = await _userManager.CheckPasswordAsync(user, request.OldPassword);

                if (!match)
                {
                    throw new RestException(HttpStatusCode.Unauthorized, new {oldPassword = "Current password is incorrect"});
                }

                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                
                var result = await _userManager.ResetPasswordAsync(user, token, request.NewPassword);
                
                if(result.Succeeded)
                     return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}