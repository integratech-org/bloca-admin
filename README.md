<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/integratech-org/bloca-admin">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">BLOCA Admin</h3>

  <p align="center">
    Web Admin Dashboard for BLOCA System
    <br />
    System Oversight • Advanced Analytics • User Management • ML Auditing
    <br />
    <a href="https://github.com/integratech-org/bloca-admin"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/integratech-org/bloca-admin/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/integratech-org/bloca-admin/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#related-projects">Related Projects</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![BLOCA Admin Banner][product-banner]](https://github.com/integratech-org/bloca-admin)

**BLOCA Admin** is the comprehensive web-based administrative dashboard for the BLOCA ecosystem. Built with React, Vite, and TanStack Router, it provides system administrators and managers with powerful tools for monitoring production operations, analyzing quality trends, managing users and permissions, auditing ML model predictions, and maintaining system health.

The dashboard features real-time data visualization using Recharts, interactive data tables with sorting and filtering, and a responsive layout optimized for desktop use. It communicates with BLOCA API via REST and WebSocket connections to provide live updates on machine status, batch progress, and system metrics.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![React][React.js]][React-url]
- [![TypeScript][TypeScript.org]][TypeScript-url]
- [![Vite][Vite.dev]][Vite-url]
- [![TanStack][TanStack.com]][TanStack-url]
- [![TailwindCSS][TailwindCSS.com]][TailwindCSS-url]
- [![Docker][Docker.com]][Docker-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is a modern web application that can be deployed as a static site or containerized with Docker.

### Prerequisites

- **Software:**
  - Node.js 20 or higher (or Bun runtime)
  - [Bun](https://bun.sh/) package manager (recommended) or npm
  - Docker and Docker Compose (for containerized deployment)

### Installation

1. Clone the repository

   ```sh
   git clone https://github.com/integratech-org/bloca-admin.git
   cd bloca-admin
   ```

2. Install dependencies

   ```sh
   bun install
   ```

3. Create environment configuration

   ```sh
   cp .env.example .env
   # Edit .env with your specific configuration:
   # - VITE_API_URL: BLOCA API base URL
   # - VITE_WS_URL: WebSocket endpoint for real-time updates
   ```

4. Start the development server

   ```sh
   bun dev
   ```

5. Install pre-commit hooks (for development)
   ```sh
   bun pre-commit
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

### Development

Start the development server with hot module replacement:

```sh
bun dev
```

The application will be available at http://localhost:5173/

### Production Build

Build the application for production:

```sh
bun build
```

The optimized bundle will be created in the `dist/` directory.

### Docker Deployment

Build and run with Docker Compose:

```sh
docker compose up -d
```

The containerized application will be available at http://localhost:3000/

### Common Operations

```sh
# Run linting
bun lint

# Fix linting issues
bun lint:fix

# Run TypeScript type checking
bun ts-check

# Format code with Prettier
bun format

# Check code formatting
bun prettier:check
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FEATURES -->

## Features

### Dashboard & Analytics

- **System Overview**: Real-time metrics showing active batches, daily production, quality rates, and machine status
- **Production Analytics**: Historical trends with time-series charts for output volume, quality distribution, and efficiency metrics
- **Quality Visualization**: Interactive charts displaying compressive strength distributions and defect classification statistics
- **Equipment Monitoring**: Machine uptime tracking, maintenance schedules, and performance indicators

### User & Permission Management

- **User Administration**: Create, edit, and deactivate user accounts
- **Role-Based Access Control**: Assign and manage Admin, Operator, and Viewer roles
- **Permission Auditing**: View user activity logs and permission changes
- **Bulk Operations**: Multi-user management with batch actions

### ML Model Auditing

- **Prediction History**: Browse all ML predictions with filtering and search
- **Model Performance Tracking**: Accuracy metrics, confusion matrices, and error analysis
- **Prediction Overrides**: Manual review and correction of ML outputs
- **Retraining Triggers**: Flag batches for model retraining when predictions diverge from actual results

### System Health Monitoring

- **Service Status**: Real-time health checks for BLOCA API, BLOCA ML, and BLOCA Edge
- **Error Logs**: Centralized logging with severity filtering and search
- **Resource Utilization**: CPU, memory, and network metrics for deployed services
- **Alert Configuration**: Set thresholds for automated notifications

### Data Management

- **Batch Explorer**: Searchable table of all production batches with detailed drill-down views
- **Export Functionality**: Download batch data, analytics reports, and images in CSV and PDF formats
- **Feedstock Inventory**: Track material consumption and alert on low stock levels
- **Deployment Management**: Monitor edge device connectivity and configuration

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- RELATED PROJECTS -->

## Related Projects

BLOCA Admin is part of the **BLOCA (Batch-Level Optimization through Compaction Analytics)** ecosystem:

- **[bloca-api](https://github.com/integratech-org/bloca-api)** - Cloud REST API backend for data persistence, user management, and business logic
- **[bloca-ml](https://github.com/integratech-org/bloca-ml)** - Machine learning service for compressive strength prediction and CNN-based surface defect classification
- **[bloca-edge](https://github.com/integratech-org/bloca-edge)** - IoT edge hub running on Raspberry Pi for real-time telemetry collection and ML coordination
- **[bloca-mobile](https://github.com/integratech-org/bloca-mobile)** - Mobile application for operators: feedstock submission, batch tracking, and remote machine control
- **[bloca-firmware](https://github.com/integratech-org/bloca-firmware)** - ESP32 firmware for sensor data collection and actuator control
- **[IntegraTech Organization](https://github.com/integratech-org)** - View all BLOCA projects and documentation

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

IntegraTech - [Facebook](https://www.facebook.com/profile.php?id=61592806334500) - integratech1@outlook.com

Project Link: [https://github.com/integratech-org/bloca-admin](https://github.com/integratech-org/bloca-admin)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/github/contributors/integratech-org/bloca-admin.svg?style=for-the-badge
[contributors-url]: https://github.com/integratech-org/bloca-admin/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/integratech-org/bloca-admin.svg?style=for-the-badge
[forks-url]: https://github.com/integratech-org/bloca-admin/network/members
[stars-shield]: https://img.shields.io/github/stars/integratech-org/bloca-admin.svg?style=for-the-badge
[stars-url]: https://github.com/integratech-org/bloca-admin/stargazers
[issues-shield]: https://img.shields.io/github/issues/integratech-org/bloca-admin.svg?style=for-the-badge
[issues-url]: https://github.com/integratech-org/bloca-admin/issues
[product-banner]: images/banner.png

<!-- Technology Badges -->

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TypeScript.org]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Vite.dev]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[TanStack.com]: https://img.shields.io/badge/TanStack-FF4154?style=for-the-badge&logo=react&logoColor=white
[TanStack-url]: https://tanstack.com/
[TailwindCSS.com]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/
[Docker.com]: https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
