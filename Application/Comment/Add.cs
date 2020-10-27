using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Api.Middlewares.Errors;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;
using Support.Security.UserAccess;

namespace Application.Comment
{
    public class Add
    {
        public class Command : IRequest<CommentDto>
        {
            public string ClipId { get; set; }
            public string Username { get; set; }
            public string Text { get; set; }
        }

        public class Handler : IRequestHandler<Command, CommentDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<CommentDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.Username); 
                if(user == null)
                    throw new RestException(HttpStatusCode.BadRequest);

                var clip = await _context.Clips.SingleOrDefaultAsync(x => x.Id == request.ClipId);
                if (clip == null)
                    throw new RestException(HttpStatusCode.BadRequest);

                var comment = new Domain.Comment
                {
                    User = user,
                    Clip = clip,
                    Text = request.Text,
                    PostedAt = DateTime.Now
                };

                _context.Comments.Add(comment);
                
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return _mapper.Map<CommentDto>(comment);
                throw new Exception("Problem saving changes");
            }
        }
    }
}