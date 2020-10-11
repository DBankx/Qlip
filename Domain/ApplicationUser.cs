﻿using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class ApplicationUser : IdentityUser
    {
        public string GravatarProfileImage { get; set; }
        public string Gender { get; set; }
    }
}