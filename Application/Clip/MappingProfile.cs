using AutoMapper;
using Domain;

namespace Application.Clip
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Domain.Clip, ClipDto>()
                .ForMember(x => x.GameName, option => option.MapFrom(source => source.Game.Name))
                .ForMember(x => x.AuthorName, opt => opt.MapFrom(s => s.ApplicationUser.UserName))
                .ForMember(x => x.AuthorImage, opt => opt.MapFrom(s => s.ApplicationUser.GravatarProfileImage));
        }
    }
}