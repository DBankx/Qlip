using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Middlewares.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;
using Support.Email;
using Support.Security.UserAccess;

namespace Application.Email
{
    public class SendEmail
    {
        public class Command : IRequest
        {
            public string Subject { get; set; }
            public string Body { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMailer _mailer;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMailer mailer, IUserAccessor userAccessor)
            {
                _context = context;
                _mailer = mailer;
                _userAccessor = userAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUser());
                
                if(user == null)
                    throw new RestException(HttpStatusCode.NotFound, new {user = "Not found"});

                await _mailer.SendEmailAsync(user, request.Subject, request.Body);
               
                return Unit.Value;
            }
        }
    }
}