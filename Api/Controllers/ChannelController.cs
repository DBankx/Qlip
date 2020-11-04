using System.Threading.Tasks;
using Application.Channel;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChannelController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ChannelController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPut]
        public async Task<ActionResult<Unit>> UpdateChannel(UpdateChannel.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<Channel>> Details(string username)
        {
            return await _mediator.Send(new Details.Query {Username = username});
        }

        [HttpPut("password")]
        public async Task<ActionResult<Unit>> UpdatePassword(UpdatePassword.Command command)
        {
            return await _mediator.Send(command);
        }
        
    }
}