using System;
using System.Text;
using System.Threading.Tasks;
using Api.Middlewares.Errors;
using Application.Clip;
using AutoMapper;
using Domain;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
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
using Support.Email;
using Support.Security.Jwt;
using Support.Security.UserAccess;
using Support.Services;
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
            // var builder = new MySqlConnectionStringBuilder();
            // builder.Password = Configuration["dbpassword"];
            // builder.Server = "localhost";
            // builder.UserID = "root";
            // builder.Database = "qlip";
            // _connection = builder.ConnectionString;
            // adding the database
            services.AddDbContext<DataContext>(option =>
            {
                option.UseLazyLoadingProxies();
                option.UseMySql(Configuration.GetConnectionString("ApplicationDatabase"), option => option.EnableRetryOnFailure());
            });
            
            //============ Adding identity options =====================
            var identityCoreBuilder = services.AddIdentityCore<ApplicationUser>();
            var identityBuilder = new IdentityBuilder(identityCoreBuilder.UserType, identityCoreBuilder.Services);
            identityBuilder.AddSignInManager<SignInManager<ApplicationUser>>();
            identityBuilder.AddEntityFrameworkStores<DataContext>().AddDefaultTokenProviders();
            
            // adding auto mapper
            services.AddAutoMapper(typeof(MappingProfile).Assembly);
            
            //================== Configuring service to get the base url ============
            services.AddHttpContextAccessor();
            services.AddSingleton<IUriService>(opt =>
            {
                var accessor = opt.GetRequiredService<IHttpContextAccessor>();
                var request = accessor.HttpContext.Request;
                var uri = string.Concat(request.Scheme, "://", request.Host.ToUriComponent());
                return new UriService(uri);
            });

            //=================== Enabling Cors ==================
            services.AddCors(option =>
            {
                option.AddDefaultPolicy(builder =>
                {
                    builder.AllowAnyHeader().WithOrigins(new string[]{"http://localhost:3000", "http://localhost:3001", "https://qlip.azurewebsites.net"}).AllowAnyMethod().AllowCredentials();
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
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero,
                };
                
                // send the token to signalR
                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        var accessToken = context.Request.Query["access_token"];
                        // get the path
                        var path = context.HttpContext.Request.Path;
                        if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/comment"))
                        {
                            context.Token = accessToken;
                        }

                        return Task.CompletedTask;
                    }
                };
            });
            
            //================ Signal R =====================
            services.AddSignalR();

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
            services.AddSingleton<IMailer, Mailer>();
            services.Configure<CloudinarySettings>(Configuration.GetSection("Cloudinary"));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ErrorHandlingMiddleware>();
            if (env.IsDevelopment())
            {
                //app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseXContentTypeOptions();
            app.UseReferrerPolicy(options => options.NoReferrer());
            app.UseXXssProtection(options => options.EnabledWithBlockMode());
            app.UseXfo(opt => opt.Deny());
            app.UseCsp(opt => 
                opt
                    .BlockAllMixedContent()
                    .FontSources(s => s.Self().CustomSources("https://fonts.gstatic.com", "https://ka-f.fontawesome.com"))
                    .FormActions(s => s.Self())
                    .FrameAncestors(s => s.Self())
                    .ImageSources(s => s.Self().CustomSources("https://res.cloudinary.com", "http://www.gravatar.com", "data:", "blob:", "https://media.rawg.io"))
                    .ScriptSources(s => s.Self().CustomSources("sha256-eE1k/Cs1U0Li9/ihPPQ7jKIGDvR8fYw65VJw+txfifw=", "https://cdnjs.cloudflare.com", "https://kit.fontawesome.com", "https://widget.cloudinary.com"))
                    .MediaSources(s => s.Self().CustomSources("https://res.cloudinary.com", "blob:", "https://cdn.plyr.io", "https://media.rawg.io"))
                );
            
            app.UseDefaultFiles();
            
            app.UseStaticFiles();
            
            app.UseRouting();

            app.UseCors();

            app.UseAuthentication();
            
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<CommentHub>("/comment");
                endpoints.MapFallbackToController("Index", "Fallback");
            });
        }
    }
}