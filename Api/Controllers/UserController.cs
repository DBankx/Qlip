using System.Threading.Tasks;
using Application.Auth;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UserController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserReturnObject>> Register(Register.Command command)
        {
            return await _mediator.Send(command);
        }
        
        [HttpPost("login")]
        public async Task<ActionResult<UserReturnObject>> Login(Login.Query query)
        {
            return await _mediator.Send(query);
        }
        
        [HttpGet]
        public async Task<ActionResult<UserReturnObject>> GetCurrentUser()
        {
            return await _mediator.Send(new CurrentUser.Query());
        }
    }
}