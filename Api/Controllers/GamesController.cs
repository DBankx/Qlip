using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Game;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Support.General;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GamesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public GamesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<PagedResponse<List<Game>>>> List([FromQuery] PaginationFilter filter)
        {
            return await _mediator.Send(new List.Query{PaginationFilter = filter, Route = Request.Path.Value});
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GameReturnObject>> Details(int id)
        {
            return await _mediator.Send(new Details.Query {Id = id});
        }
    }
}