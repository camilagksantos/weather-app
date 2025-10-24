# ☀️ Weather App

A modern web application for real-time weather information lookup for any city worldwide. Features a dynamic theme that adapts to the temperature of the searched location.

![Angular](https://img.shields.io/badge/Angular-15.2.10-red?logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue?logo=typescript)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Integration](#-api-integration)
- [Theming System](#-theming-system)
- [Docker Setup](#-docker-setup)
- [Development](#-development)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

Weather App is a responsive Angular application that provides instant access to current weather conditions for cities around the globe. Built with modern web technologies and best practices, it offers an intuitive user experience with visual feedback and error handling.

**Key Highlights:**
- Real-time weather data from OpenWeatherMap API
- Dynamic UI theming based on temperature
- Fully containerized with Docker
- Responsive design with Bootstrap 5
- Type-safe with TypeScript interfaces
- Optimized with RxJS reactive patterns

---

## ✨ Features

### 🔍 City Search
- Search weather by city name
- Input validation
- Visual loading feedback
- FontAwesome icons integration

### 🌡️ Weather Information Display
- Current temperature (°C)
- Min/Max temperature range
- Humidity percentage
- Wind speed (km/h)
- City name and country code
- Contextual background images

### 🎨 Dynamic Theme System
- **Cold Theme** (< 20°C): Blue color palette
- **Hot Theme** (≥ 20°C): Orange/Red color palette
- Smooth transitions between themes
- Applied to: background, inputs, cards, and icons

### ⚠️ Error Handling
- City not found (404)
- Network/Connection errors (500+)
- Generic error fallback
- Empty field validation
- Bootstrap alert messages

### 💫 UI States
- Animated loading spinner
- Disabled states during requests
- Visual focus feedback on inputs
- Fade-in animation for weather cards

---

## 🛠️ Tech Stack

### Frontend
- **Angular:** 15.2.10
- **TypeScript:** 4.9.5
- **RxJS:** 7.8.0
- **FontAwesome:** 0.12.1 (Angular) + 6.5.0 (Icons)
- **Bootstrap:** 5.3.0 (CDN)

### Development Environment
- **Node.js:** v18.20.8 (Docker)
- **npm:** 10.8.2 (Docker)
- **Angular CLI:** 15.2.11 (Docker)
- **Docker:** Desktop (Apple Silicon compatible)
- **Docker Compose:** 3.8

### External API
- **OpenWeatherMap API:** v2.5 (Current Weather Data)

---

## 🚀 Getting Started

### Prerequisites

- Docker and Docker Compose installed
- OpenWeatherMap API key ([Get one here](https://openweathermap.org/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weather-app
   ```

2. **Set up your API key**
   
   Create or update the environment configuration in `src/environments/environment.ts`:
   ```typescript
   export const environment = {
     production: false,
     weatherApiKey: 'YOUR_API_KEY_HERE'
   };
   ```

3. **Build and start the Docker container**
   ```bash
   docker-compose up -d
   ```

4. **Access the container**
   ```bash
   docker exec -it weather-app-angular15 sh
   ```

5. **Install dependencies**
   ```bash
   npm install
   ```

6. **Start the development server**
   ```bash
   ng serve --host 0.0.0.0
   ```

7. **Open your browser**
   
   Navigate to `http://localhost:4200`

---

## 📁 Project Structure

```
weather-app/
├── src/
│   ├── app/
│   │   ├── models/
│   │   │   ├── enums/
│   │   │   │   └── weather-error-message.enum.ts
│   │   │   └── interfaces/
│   │   │       └── weather-data.interface.ts
│   │   ├── services/
│   │   │   └── weather.service.ts
│   │   ├── shared/
│   │   │   └── spinner.css
│   │   └── weather/
│   │       └── components/
│   │           ├── weather-card/
│   │           │   ├── weather-card.component.ts
│   │           │   ├── weather-card.component.html
│   │           │   └── weather-card.component.css
│   │           └── weather-home/
│   │               ├── weather-home.component.ts
│   │               ├── weather-home.component.html
│   │               └── weather-home.component.css
│   ├── assets/
│   │   ├── sun.jpg
│   │   └── cold1.jpg
│   └── environments/
├── Dockerfile
├── docker-compose.yml
└── README.md
```

### Key Components

- **weather-home:** Main container component handling search logic
- **weather-card:** Presentation component displaying weather data
- **weather.service:** API communication service with RxJS
- **Models:** TypeScript interfaces and enums for type safety

---

## 🌐 API Integration

### Endpoint
```
GET https://api.openweathermap.org/data/2.5/weather
```

### Request Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| `q` | string | City name |
| `appid` | string | Your API key |
| `units` | string | Temperature unit (metric for Celsius) |

### Response Interface
```typescript
interface IWeatherData {
  name: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
}
```

---

## 🎨 Theming System

### Cold Theme (< 20°C)
```css
--primary: #1e3a8a
--secondary: #3b82f6
--accent: #60a5fa
--background: #0f172a
--card: #1e293b
```

### Hot Theme (≥ 20°C)
```css
--primary: #7c2d12
--secondary: #ea580c
--accent: #fbbf24
```

### Typography
- **Font Family:** Inter, Segoe UI, Tahoma, sans-serif
- **Sizes:** 0.75rem - 5rem
- **Weights:** 500, 600, 700

---

## 🐳 Docker Setup

### Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
RUN npm install -g @angular/cli@15
EXPOSE 4200
CMD ["sh"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  angular-app:
    build: .
    container_name: weather-app-angular15
    ports:
      - "4200:4200"
    volumes:
      - ./weather-app:/app
      - node_modules_volume:/app/node_modules
    working_dir: /app
    command: sh
    stdin_open: true
    tty: true

volumes:
  node_modules_volume:
```

---

## 💻 Development

### Code Quality Features

- ✅ **Async Pipe:** Automatic subscription management
- ✅ **ChangeDetectorRef:** Manual change detection control
- ✅ **RxJS Operators:** tap, catchError, finalize, of
- ✅ **Type Safety:** Enums and interfaces throughout
- ✅ **Component Communication:** @Input decorators
- ✅ **Responsive Design:** CSS Grid and media queries

### Running Tests
```bash
# Unit tests
ng test

# E2E tests
ng e2e
```

### Building for Production
```bash
ng build --configuration production
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Camila Kfouri**

- Course: Udemy - Marcos Junior Passarella Naves
- Project Date: October 2025

---

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for the weather API
- [FontAwesome](https://fontawesome.com/) for the icon library
- [Bootstrap](https://getbootstrap.com/) for the CSS framework
- [Angular](https://angular.io/) for the amazing framework

---

## 📞 Support

If you have any questions or need help, please open an issue in the GitHub repository.

---

<div align="center">
  Made with ❤️ and Angular
</div>