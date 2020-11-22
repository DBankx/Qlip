using System;
using AutoMapper;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistance;
using Support.Security.UserAccess;

namespace Application.Clip
{
    public class WatchedAtValueResolver : IValueResolver<Domain.Clip, HistoryClipsDto, DateTime>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public WatchedAtValueResolver(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public DateTime Resolve(Domain.Clip source, HistoryClipsDto destination, DateTime destMember, ResolutionContext context)
        {
            var user = _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUser()).Result;

            var view = _context.Views.SingleOrDefaultAsync(x =>
                x.ApplicationUserId == user.Id && x.ClipId == source.Id).Result;
            
            return view.WatchedAt;
        }
    }
}