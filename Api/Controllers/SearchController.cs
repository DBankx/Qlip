using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Channel;
using Application.Clip;
using Application.Game;
using Application.Search;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Support.General;

namespace Api.Controllers
{
    /// <summary>
    /// Api endpoint for search features
    /// endpoint: http://localhost:5000/api/search
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class SearchController : ControllerBase
    {
        private readonly IMediator _mediator;

        public SearchController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("qlips")]
        public async Task<ActionResult<PagedResponse<List<ClipDto>>>> SearchClipByTitle([FromQuery]string title, [FromQuery] PaginationFilter filter)
        {
            return await _mediator.Send(new SearchClipByTitle.Query {Title = title, PaginationFilter = filter, Route = Request.Path.Value});
        }

        [HttpGet("channels")]
        public async Task<ActionResult<PagedResponse<List<ChannelFollowDto>>>> searchChannelsByUsername(
            [FromQuery] string username, [FromQuery] PaginationFilter filter)
        {
            return await _mediator.Send(new SearchChannelByUsername.Query
                {PaginationFilter = filter, Username = username, Route = Request.Path.Value});
        }

        [HttpGet("games")]
        public async Task<ActionResult<PagedResponse<List<AllGamesDto>>>> SearchGamesByGameName(
            [FromQuery] string gameName, [FromQuery] PaginationFilter Filter)
        {
            return await _mediator.Send(new SearchGameByName.Query
                {GameName = gameName, PaginationFilter = Filter, Route = Request.Path.Value});
        }

        [HttpGet("clipgames")]
        public async Task<ActionResult<PagedResponse<List<ClipDto>>>> SearchClipByGameName([FromQuery] string gameName, [FromQuery] PaginationFilter filter)
        {
            return await _mediator.Send(new SearchClipByGameName.Query
                {GameName = gameName, PaginationFilter = filter, Route = Request.Path.Value});
        }
    }
}