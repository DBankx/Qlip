using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Support.Video
{
    public interface IVideoAccessor
    {
        string DeleteClip(string publicId);
    }
}