using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Channel;
using Application.Follows;
using MediatR;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    /// <summary>
    /// Api controller for subscription features
    /// endpoint: http://localhost:5000/api/follow
    /// </summary>
    [ApiController]
    [Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
    public class SubscriptionController : ControllerBase
    {
        private readonly IMediator _mediator;

        public SubscriptionController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("{username}/subscribe")]
        public async Task<ActionResult<Unit>> Subscribe(string username)
        {
            return await _mediator.Send(new FollowUser.Command {Username = username});
        }
        
         [HttpPost("{username}/unsubscribe")]
         public async Task<ActionResult<Unit>> UnSubscribe(string username)
         {
             return await _mediator.Send(new UnSubscribe.Command{Username = username});
         }

         [HttpGet("{username}/{predicate}")]
         public async Task<ActionResult<List<ChannelFollowDto>>> List(string username, string predicate)
         {
             return await _mediator.Send(new List.Query {Username = username, Predicate = predicate});
         }
    }
}