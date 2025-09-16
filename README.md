# Personal Website

A modern personal website built with ASP.NET Core 8.0, featuring interactive elements, contact forms, and responsive design.

## 🚀 Features

- **Home Page**: Interactive landing page with 3D rendering and particle effects
- **Contact Form**: Functional contact form with validation
- **InfoBot**: Interactive information bot page
- **Responsive Design**: Mobile-friendly layout using Bootstrap
- **Interactive Elements**: 
  - 3D rendering with WebGL
  - Particle effects using tsparticles
  - Custom JavaScript animations

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- **.NET 8.0 SDK** or later
- **Node.js** (for npm dependencies)
- **Docker** (optional, for containerized deployment)

### Installing Prerequisites

#### .NET 8.0 SDK
- Download from [Microsoft's official website](https://dotnet.microsoft.com/download/dotnet/8.0)
- Verify installation: `dotnet --version`

#### Node.js
- Download from [nodejs.org](https://nodejs.org/)
- Verify installation: `node --version` and `npm --version`

## 🛠️ Getting Started

### 1. Navigate to the Project
```bash
cd Personal-Website
```

### 2. Install Dependencies

#### .NET Dependencies
The .NET dependencies will be automatically restored when you build the project.

#### Node.js Dependencies
```bash
npm install
```

### 3. Build the Project

#### Development Build
```bash
cd "Personal Website"
dotnet build
```

#### Release Build
```bash
cd "Personal Website"
dotnet build -c Release
```

### 4. Run the Application

#### Development Mode
```bash
cd "Personal Website"
dotnet run
```

The application will be available at:
- HTTP: `http://localhost:5050`
- HTTPS: `https://localhost:7046`

#### Using Visual Studio
1. Open `Personal Website.sln` in Visual Studio
2. Press F5 or click "Start Debugging"

#### Using Visual Studio Code
1. Open the project folder in VS Code
2. Install the C# extension
3. Press F5 to start debugging

## 🐳 Docker Deployment

### Build Docker Image
```bash
docker build -t personal-website .
```

### Run Docker Container
```bash
docker run -p 8080:8080 personal-website
```

The application will be available at `http://localhost:8080`

## 📁 Project Structure

```
Personal-Website/
├── Personal Website/           # Main ASP.NET Core project
│   ├── Controllers/           # MVC Controllers
│   │   ├── HomeController.cs  # Main controller
│   │   └── ContactController.cs
│   ├── Models/               # Data models
│   ├── Views/                # Razor views
│   │   ├── Home/            # Home page views
│   │   └── Shared/          # Shared layouts
│   ├── wwwroot/             # Static files
│   │   ├── css/            # Stylesheets
│   │   ├── js/             # JavaScript files
│   │   ├── images/         # Images and assets
│   │   └── lib/            # Third-party libraries
│   ├── Program.cs          # Application entry point
│   └── Personal Website.csproj
├── Dockerfile              # Docker configuration
├── package.json           # Node.js dependencies
└── README.md             # This file
```

## 🎨 Key Technologies

- **Backend**: ASP.NET Core 8.0 MVC
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **UI Framework**: Bootstrap 5
- **Interactive Elements**: 
  - tsparticles (particle effects)
  - Custom 3D rendering
- **Development**: Visual Studio / VS Code
- **Deployment**: Docker, IIS

## 🔧 Configuration

### Environment Settings
- Development settings: `appsettings.Development.json`
- Production settings: `appsettings.json`

### Launch Profiles
The project includes multiple launch profiles:
- **HTTP**: Runs on `http://localhost:5050`
- **HTTPS**: Runs on `https://localhost:7046`
- **IIS Express**: For Visual Studio integration

## 🚀 Deployment Options

### IIS Deployment
1. Publish the application: `dotnet publish -c Release`
2. Copy published files to IIS directory
3. Configure IIS to serve the application

### Docker Deployment
1. Build the Docker image
2. Push to container registry
3. Deploy to your hosting platform

### Azure App Service
1. Create an Azure App Service
2. Deploy using Visual Studio or Azure CLI
3. Configure application settings

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use
If you get a port conflict error:
```bash
dotnet run --urls "http://localhost:5001"
```

#### Missing Dependencies
Ensure all prerequisites are installed:
```bash
dotnet --version  # Should show 8.0.x
node --version    # Should show 18.x or later
```

#### Build Errors
Clean and rebuild:
```bash
dotnet clean
dotnet restore
dotnet build
```

## 📝 Development Notes

- The project uses nullable reference types
- Implicit usings are enabled
- Static files are served from `wwwroot/`
- The application uses HTTPS redirection in production

## 📄 License

This is a personal project for local use only. Please respect any third-party library licenses.

---


