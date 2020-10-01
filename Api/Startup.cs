using Application.Clip;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MySql.Data.MySqlClient;
using Persistance;
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
            
            
            // configuring DI interfaces
            services.AddScoped<IVideoAccessor, VideoAccessor>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}