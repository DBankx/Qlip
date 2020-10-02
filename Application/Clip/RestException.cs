using System;
using System.Net;

namespace Api.Middlewares.Errors
{
    /// <summary>
    /// Exception class to handle errors thrown from the Api's handler and send them as the response
    /// Contains a status code & the error message that should be sent
    /// </summary>
    public class RestException : Exception
    {
        public RestException(HttpStatusCode code, object errors = null)
        {
            Code = code;
            Errors = errors;
        }
        public HttpStatusCode Code { get; set; }
        public object Errors { get; set; }
    }
}