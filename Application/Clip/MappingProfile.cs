using AutoMapper;
using Domain;
using Profile = AutoMapper.Profile;

namespace Application.Clip
{
    public class MappingProfile : AutoMapper.Profile
    {
        public MappingProfile()
        {
            CreateMap<Domain.Clip, ClipDto>()
                .ForMember(x => x.GameName, option => option.MapFrom(source => source.Game.Name))
                .ForMember(x => x.AuthorName, opt => opt.MapFrom(s => s.ApplicationUser.UserName))
                .ForMember(x => x.AuthorImage, opt => opt.MapFrom(s => s.ApplicationUser.GravatarProfileImage))
                .ForMember(x => x.Likes, opt => opt.MapFrom<ClipLikeResolver>())
                .ForMember(x => x.Dislikes, opt => opt.MapFrom<ClipDislikeReslover>())
                .ForMember(x => x.IsLiked, opt => opt.MapFrom<IsLikedValueResolver>())
                .ForMember(x => x.IsDisliked, opt => opt.MapFrom<IsDislikedValueResolver>());
        }
    }
}