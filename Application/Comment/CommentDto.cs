using System;
using Domain;

namespace Application.Comment
{
    public class CommentDto
    {
         public Guid Id { get; set; }
         public string GravatarProfileImage { get; set; }
         public string Username { get; set; }
         public string Text { get; set; }
         public DateTime PostedAt { get; set; }
    }
}