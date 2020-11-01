using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Support.Video
{
    public interface IVideoAccessor
    {
        Task<VideoUploadResult> UploadClip(IFormFile videoFile);
        string DeleteClip(string publicId);
    }
}