# 1. Use official .NET 9 runtime image
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 5000

# 2. Use .NET 9 SDK image to build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# 3. Copy all source files including .env.local
COPY . .

# Copy the .env.local file explicitly if it’s outside your source folder:
# COPY ../.env.local ./ 

RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish

# 5. Final runtime image
FROM base AS final
WORKDIR /app

# Copy published app files
COPY --from=build /app/publish .

# Copy the .env.local file to /app as well for runtime env loading
COPY .env.local ./

ENTRYPOINT ["dotnet", "server.dll"]
