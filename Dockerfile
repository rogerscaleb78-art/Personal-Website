FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["Personal Website/Personal Website.csproj", "Personal Website/"]
RUN dotnet restore "Personal Website/Personal Website.csproj"
COPY . .
WORKDIR "/src/Personal Website"
RUN dotnet build "Personal Website.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Personal Website.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Personal Website.dll"]
