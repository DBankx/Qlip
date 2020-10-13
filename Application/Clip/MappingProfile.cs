using AutoMapper;

namespace Application.Clip
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Domain.Clip, ClipDto>()
                .ForMember(x => x.GameName, option => option.MapFrom(source => source.Game.Name));
        }
    }
}