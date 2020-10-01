using Microsoft.AspNetCore.Http;

namespace Support.Video
{
    public interface IVideoAccessor
    {
        VideoUploadResult UploadClip(IFormFile videoFile);
        string DeleteClip(string publicId);
    }
}