using AutoMapper;

namespace Application.Game
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Domain.Game, GameDto>();
            CreateMap<Domain.Game, AllGamesDto>();
        }
    }
}