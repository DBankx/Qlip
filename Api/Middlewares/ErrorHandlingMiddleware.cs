using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace Api.Middlewares.Errors
{
    /// <summary>
    /// Error middleware to detrmine if the error in the response
    /// is a normal exception or the created rest exception thrown from the handler.
    /// </summary>
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;
            private readonly ILogger<ErrorHandlingMiddleware> _logger;

            public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
            {
                _next = next;
                _logger = logger;
            }

            //checks to see if there is an exception, if there isint it passes the request unto the next middleware in the pipeline
            public async Task Invoke(HttpContext context)
            {
                try
                {
                    await _next(context);
                }
                catch (Exception ex)
                {
                    await HandleExceptionAsync(context, ex, _logger);
                }
            }

            //checks the error to see if it is the rest exception i created and handles it
            private async Task HandleExceptionAsync(HttpContext context, Exception ex,
                ILogger<ErrorHandlingMiddleware> logger)
            {
                object errors = null;

                switch (ex)
                {
                    //send the errors with the status code
                    //your exception class you created for http response goes here
                    case RestException re:
                        logger.LogError(ex, "REST ERROR");
                        errors = re.Errors;
                        context.Response.StatusCode = (int) re.Code;
                        break;
                    //if the error is a normal exception send back a 500 status code (Internal server error)
                    case Exception e:
                        logger.LogError(e, "SERVER ERROR");
                        errors = string.IsNullOrWhiteSpace(e.Message) ? "Error" : e.Message;
                        context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;
                        break;
                }

                context.Response.ContentType = "application/json";

                //write the errors to the response object if it isint null
                if (errors != null)
                {
                    var result = JsonSerializer.Serialize(new
                    {
                        errors
                    });

                    await context.Response.WriteAsync(result);
                }
            }
    }
}