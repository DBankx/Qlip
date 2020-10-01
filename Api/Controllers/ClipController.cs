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
    }
}