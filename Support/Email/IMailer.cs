using System.Threading.Tasks;
using Domain;

namespace Support.Email
{
    public interface IMailer
    {
        Task SendEmailAsync(ApplicationUser user, string subject, string body);
    }
}