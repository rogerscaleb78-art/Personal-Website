using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mail;
using Personal_Website.Models;
using System;
using System.Threading.Tasks;

namespace Personal_Website.Controllers // Changed namespace to match likely structure
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        [HttpPost("send")] // This should create /api/contact/send
        public async Task<IActionResult> Send([FromBody] ContactFormModel request)
        {
            // Your existing email sending code here
            // Use the synchronous version for now to avoid complexity
            try
            {
                var fromEmail = Environment.GetEnvironmentVariable("CONTACT_EMAIL");
                var fromPass = Environment.GetEnvironmentVariable("CONTACT_EMAIL_APP_PASSWORD");

                if (string.IsNullOrEmpty(fromEmail) || string.IsNullOrEmpty(fromPass))
                {
                    return StatusCode(500, new { success = false, error = "Email credentials not set." });
                }

                using var smtp = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential(fromEmail, fromPass),
                    EnableSsl = true,
                    Timeout = 30000
                };

                using var mail = new MailMessage
                {
                    From = new MailAddress(fromEmail),
                    Subject = $"New Contact Form Submission from {request.Name}",
                    Body = $"Name: {request.Name}\nEmail: {request.Email}\nMessage:\n{request.Message}",
                    IsBodyHtml = false
                };

                mail.To.Add(fromEmail);

                // Use synchronous send for simplicity
                smtp.Send(mail);

                return Ok(new { success = true, message = "Email sent successfully." });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Email send failed: {ex.Message}");
                return StatusCode(500, new { success = false, error = "Failed to send email. Please try again." });
            }
        }
    }
}