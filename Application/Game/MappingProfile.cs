using AutoMapper;

namespace Application.Game
{
    public class MappingProfile : AutoMapper.Profile
    {
        public MappingProfile()
        {
            CreateMap<Domain.Game, GameDto>();
            CreateMap<Domain.Game, AllGamesDto>();
        }
    }
}