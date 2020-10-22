using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Game;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Support.General;

namespace Api.Controllers
{
     /// <summary>
        /// Api endpoints for game features
        /// endpoint: http://localhost:5000/api/game
        /// </summary>
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
        public async Task<ActionResult<PagedResponse<List<AllGamesDto>>>> List([FromQuery] PaginationFilter filter)
        {
            return await _mediator.Send(new List.Query{PaginationFilter = filter, Route = Request.Path.Value});
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GameDto>> Details(int id)
        {
            return await _mediator.Send(new Details.Query {Id = id});
        }

        [HttpPut("{gameId}")]
        public async Task<ActionResult<Unit>> LikeGame(int gameId)
        {
            return await _mediator.Send(new LikeGame.Command {GameId = gameId});
        }

        [HttpPut("{gameId}/unlike")]
        public async Task<ActionResult<Unit>> UnlikeGame(int gameId)
        {
            return await _mediator.Send(new UnlikeGame.Command {GameId = gameId});
        }
    }
}