FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

ENV CONNECTIONSTRINGS__ASPNETCORE_CONNECTION="Server=sql-server;Database=NetCoreSample;User Id=sa;Password=sa@a2020;MultipleActiveResultSets=true"
# Copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "StepProject.dll"]
EXPOSE 80
EXPOSE 8080