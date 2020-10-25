using AutoMapper;
using Domain;

namespace Application.Channel
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ApplicationUser, ChannelFollowDto>();
        }
    }
}