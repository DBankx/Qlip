using Domain;

namespace Support.Security.Jwt
{
    public interface IJwtGenerator
    {
        string GenerateToken(ApplicationUser user);
    }

}