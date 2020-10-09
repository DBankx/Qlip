using System;
using System.IO;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace Support.Video
{
    public class VideoAccessor : IVideoAccessor
    {
        private readonly Cloudinary _cloudinary;
        public VideoAccessor(IConfiguration config)
        {
            // instantiate a new instance of cloudinary using details provided
            _cloudinary = new Cloudinary(config["cloudinary"]);
        }
        
        public VideoUploadResult UploadClip(IFormFile videoFile)
        {
            var uploadResult = new CloudinaryDotNet.Actions.VideoUploadResult();
            if (videoFile.Length > 0)
            {
                // create a new file stream to upload the video to cloudinary
                using (var filestream = videoFile.OpenReadStream())
                {
                var uploadParams = new VideoUploadParams
                {
                    File = new FileDescription(videoFile.FileName, filestream),
                    Transformation = new Transformation().StartOffset("0").EndOffset("60").Crop("fill")

                };
                uploadResult = _cloudinary.Upload(uploadParams);
                
                }
            }
            
            // checks if error occurs when uploading video
            if (uploadResult.Error != null)
            {
                throw new Exception(uploadResult.Error.Message);
            }

            return new VideoUploadResult
            {
                PublicId = uploadResult.PublicId,
                Url = uploadResult.SecureUrl.AbsoluteUri
            };
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