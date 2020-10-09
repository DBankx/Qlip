using System;
using System.Text;
using Api.Middlewares.Errors;
using Application.Clip;
using Domain;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using MySql.Data.MySqlClient;
using Persistance;
using Support.Security.Jwt;
using Support.Security.UserAccess;
using Support.Video;

namespace Api
{
    public class Startup
    {
        private string _connection;
        
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers().AddFluentValidation(option =>
            {
                option.RegisterValidatorsFromAssemblyContaining<CreateClip>();
            });
            services.AddMediatR(typeof(CreateClip.Handler).Assembly);
            
            //=================== Connecting to mySqlDatabase =========================
            // building connection string;
            var builder = new MySqlConnectionStringBuilder();
            builder.Password = Configuration["dbpassword"];
            builder.Server = "localhost";
            builder.UserID = "root";
            builder.Database = "qlip";
            _connection = builder.ConnectionString;
            // adding the database
            services.AddDbContext<DataContext>(option =>
            {
                option.UseMySql(Configuration.GetConnectionString("ApplicationDatabase"));
            });
            
            //============ Adding identity options =====================
            var identityCoreBuilder = services.AddIdentityCore<ApplicationUser>();
            var identityBuilder = new IdentityBuilder(identityCoreBuilder.UserType, identityCoreBuilder.Services);
            identityBuilder.AddSignInManager<SignInManager<ApplicationUser>>();
            identityBuilder.AddEntityFrameworkStores<DataContext>();
            

            //=================== Enabling Cors ==================
            services.AddCors(option =>
            {
                option.AddDefaultPolicy(builder =>
                {
                    builder.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod();
                });
            });
            
            //=============== Enabling jwt ==================
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["jwtkey"]));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    IssuerSigningKey = key,
                    ValidateIssuer = false,
                    ValidateIssuerSigningKey = true,
                    ValidateAudience = false
                };
            });

            services.Configure<IISServerOptions>(options =>
            {
                options.MaxRequestBodySize = 209715200;
            });
            
            //============ Kestrel Config to allow large object files =========
            services.Configure<KestrelServerOptions>(options =>
            {
                options.Limits.MaxRequestBodySize = 209715200;
            });
            
            //======= configuring the form multipart body length ==============
            services.Configure<FormOptions>(x =>
            {
                x.ValueLengthLimit = 209715200;
                x.MultipartBodyLengthLimit = 209715200; // if don't set default value is: 128 MB
                x.MultipartHeadersLengthLimit = 209715200;
            });
            
            // configuring DI interfaces
            services.AddScoped<IVideoAccessor, VideoAccessor>();
            services.AddScoped<IJwtGenerator, JwtGenerator>();
            services.AddScoped<IUserAccessor, UserAccessor>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ErrorHandlingMiddleware>();
            if (env.IsDevelopment())
            {
                //app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseCors();

            app.UseAuthentication();
            
            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}