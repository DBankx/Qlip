using AutoMapper;
using Persistance;

namespace Application.Clip
{
    public class ViewReslover : IValueResolver<Domain.Clip, ClipDto, int>
    {
        private readonly DataContext _context;

        public ViewReslover(DataContext context)
        {
            _context = context;
        }
        public int Resolve(Domain.Clip source, ClipDto destination, int destMember, ResolutionContext context)
        {
            var views = source.Views.Count;
            return views;
        }
    }
    
    public class ViewReslover2 : IValueResolver<Domain.Clip, AllClipsDto, int>
        {
            private readonly DataContext _context;
    
            public ViewReslover2(DataContext context)
            {
                _context = context;
            }
            public int Resolve(Domain.Clip source, AllClipsDto destination, int destMember, ResolutionContext context)
            {
                var views = source.Views.Count;
                return views;
            }
        }
}