using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Comment;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace Api
{
    public class CommentHub : Hub
    {
        private readonly IMediator _mediator;

        public CommentHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task SendComment(Add.Command command)
        {
            var username = GetUsername();
            command.Username = username;
            var comment = await _mediator.Send(command);
            // send message to all clients connected to the clip
            await Clients.Group(command.ClipId).SendAsync("RecieveComment", comment);

        }

        public string GetUsername()
        {
            return Context.User?.Claims?.SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
        }

        public async Task AddToGroup(string groupName)
        {
            string username = GetUsername();
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            await Clients.Group(groupName).SendAsync("Send", $"{username} has joined the group");
        }

        public async Task RemoveFromGroup(string groupName)
        {
            string username = GetUsername();
            
            // remove from group
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            await Clients.Group(groupName).SendAsync("Send", $"{username} has left the group");
        }
    }
}