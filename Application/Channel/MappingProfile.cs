using AutoMapper;
using Domain;

namespace Application.Channel
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ApplicationUser, ChannelFollowDto>()
                .ForMember(x => x.SubscribedToChannel, opt => opt.MapFrom<IsSubscribedValueResolver>())
                .ForMember(x => x.SubscriberCount, opt => opt.MapFrom<ChannelSubscriberCountResolver>());
        }
    }
}