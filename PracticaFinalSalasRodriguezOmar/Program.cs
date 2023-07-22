using PracticaFinalLuisAngelMendozaLucio.Databases;
using PracticaFinalLuisAngelMendozaLucio.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// MongoConnection
builder.Services.Configure<MongoConnection>(builder.Configuration.GetSection("MongoConnection"));

// Services
builder.Services.AddSingleton<PersonalItemService>();

// The property names' default camel casing should be changed to match the Pascal casing of the CLR object's property names.
builder.Services.AddControllers().AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null);

builder.Services.AddControllersWithViews();

builder.Services.AddCors(options =>
{

    options.AddPolicy("PoliticaCors",
        policy =>
        {
            policy.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
}
app.UseCors("PoliticaCors");
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();

