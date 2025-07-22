var builder = WebApplication.CreateBuilder(args);

var allowedOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>() ?? Array.Empty<string>();

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();  // Important for credentials (cookies, auth headers)
    });
});

var app = builder.Build();

app.UseRouting(); // Add this before UseCors

app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();
