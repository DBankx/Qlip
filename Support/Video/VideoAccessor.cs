using System;
using System.IO;
using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace Support.Video
{
    public class VideoAccessor : IVideoAccessor
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly Cloudinary _cloudinary;
        public VideoAccessor(IConfiguration config, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            // instantiate a new instance of cloudinary using details provided
            _cloudinary = new Cloudinary(config["cloudinary"]);
        }
        

        public string DeleteClip(string publicId)
        {
           var deleteParams = new DeletionParams(publicId);
           deleteParams.ResourceType = ResourceType.Video;
           var result = _cloudinary.Destroy(deleteParams);
           return result.Result == "ok" ? result.Result : null;
        }
    }
}