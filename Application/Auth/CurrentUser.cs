using System.Collections.Generic;
using System.Diagnostics;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Middlewares.Errors;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Support.Security.Jwt;
using Support.Security.UserAccess;

namespace Application.Auth
{
    public class CurrentUser
    {
        public class Query : IRequest<UserReturnObject>
        {
        }


        public class Handler : IRequestHandler<Query, UserReturnObject>
        {
            private readonly UserManager<ApplicationUser> _userManager;
            private readonly IUserAccessor _userAccessor;
            private readonly IJwtGenerator _jwtGenerator;

            public Handler(UserManager<ApplicationUser> userManager, IUserAccessor userAccessor, IJwtGenerator jwtGenerator)
            {
                _userManager = userManager;
                _userAccessor = userAccessor;
                _jwtGenerator = jwtGenerator;
            }

            public async Task<UserReturnObject> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUser());
                
                if(user == null)
                    throw new RestException(HttpStatusCode.NotFound, new {user = "Not Found"});

                return new UserReturnObject
                {
                    GravatarProfileImage = user.GravatarProfileImage,
                    Username = user.UserName,
                    Token = _jwtGenerator.GenerateToken(user)
                };
            }
        }
    }
}