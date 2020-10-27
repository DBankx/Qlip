using AutoMapper;

namespace Application.Comment
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Domain.Comment, CommentDto>()
                .ForMember(x => x.GravatarProfileImage, opt => opt.MapFrom(s => s.User.GravatarProfileImage))
                .ForMember(x => x.Username, opt => opt.MapFrom(s => s.User.UserName));
        }
    }
}