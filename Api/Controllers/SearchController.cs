using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Clip;
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
    }
}