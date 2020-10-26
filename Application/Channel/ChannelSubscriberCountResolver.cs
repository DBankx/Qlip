using AutoMapper;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Channel
{
    public class ChannelSubscriberCountResolver : IValueResolver<ApplicationUser, ChannelFollowDto, int>
    {
        private readonly DataContext _context;

        public ChannelSubscriberCountResolver(DataContext context)
        {
            _context = context;
        }
        public int Resolve(ApplicationUser source, ChannelFollowDto destination, int destMember, ResolutionContext context)
        {
            return source.Followers.Count;
        }
    }
}