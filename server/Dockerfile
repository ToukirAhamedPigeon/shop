# 1. Use official .NET 9 runtime image
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80

# 2. Use .NET 9 SDK image to build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# 3. Copy everything and restore dependencies
COPY . .
RUN dotnet restore

# 4. Publish the application
RUN dotnet publish -c Release -o /app/publish

# 5. Final runtime image
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .

# 6. Replace 'YourProjectName.dll' with your actual DLL
ENTRYPOINT ["dotnet", "server.dll"]
