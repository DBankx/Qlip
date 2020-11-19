using System;
using System.Threading.Tasks;
using Domain;
using Microsoft.Extensions.Options;
using MimeKit;
using MailKit.Net.Smtp;

namespace Support.Email
{
    public class Mailer : IMailer
    {
        public async Task SendEmailAsync(ApplicationUser user, string subject, string body)
        {
            try
            {
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress(user.UserName, user.Email));
                message.To.Add(new MailboxAddress("loldondo@gmail.com"));
                message.Subject = subject;
                message.Body = new TextPart("html")
                {
                    Text = body
                };

                using (var client = new SmtpClient())
                {
                    client.CheckCertificateRevocation = false;
                    client.SslProtocols = System.Security.Authentication.SslProtocols.Tls11;
                   await client.ConnectAsync("smtp.gmail.com", 465, true); 
                   client.AuthenticationMechanisms.Remove("XOAUTH2");
                   await client.AuthenticateAsync("loldondo@gmail.com", "Damtex619");
                   await client.SendAsync(message);
                   await client.DisconnectAsync(true);
                }
            }
            catch (Exception e)
            {
                throw new InvalidOperationException(e.Message);
            }
        }
    }
}