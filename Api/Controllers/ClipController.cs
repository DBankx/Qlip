using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Clip;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    /// <summary>
    /// Api endpoints for clip features
    /// endpoint: http://localhost:5000/api/clip
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class ClipController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ClipController(IMediator mediator)
        {
            _mediator = mediator;
        }
        
        [HttpPost]
        public async Task<ActionResult<Clip>> CreateClip([FromForm]CreateClip.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> DeleteClip(string id)
        {
            return await _mediator.Send(new DeleteClip.Command {PublicId = id});
        }

        [HttpGet]
        public async Task<ActionResult<List<Clip>>> GetAllClips()
        {
            return await _mediator.Send(new List.Query());
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Clip>> GetClip(string id)
        {
            return await _mediator.Send(new Details.Query {ClipId = id});
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> EditClip(string id, UpdateClip.Command command)
        {
            command.ClipId = id;
            return await _mediator.Send(command);
        }
    }
}