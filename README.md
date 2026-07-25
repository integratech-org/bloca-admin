# Bloca Admin Dashboard (`bloca-admin`)

Part of the **BLOCA** ecosystem — an IoT-monitored plastic-to-brick compactor with machine learning-based grading.

`bloca-admin` is the administrative web dashboard built for facility operators and managers to monitor live compactor telemetry, sensor streams, machine learning grading results, and system health in real time.

## Features

- **Live Telemetry & Monitoring:** Real-time dashboards tracking compaction pressure, temperature, load cells, and cycle status.
- **ML Grading Analytics:** View and audit machine learning grading classifications for produced construction-ready bricks.
- **Device Management:** Register, configure, and monitor IoT compactor units deployed across facilities.
- **Role-Based Access & Audit Logs:** Secure management interfaces with granular user permissions.

## Tech Stack

- **Framework:** React 19 with Vite & TypeScript
- **Routing:** TanStack Router (`@tanstack/react-router`)
- **State & Data Fetching:** TanStack Query (`@tanstack/react-query`) & Zustand
- **UI & Styling:** Tailwind CSS v4 with Shadcn UI / Radix primitives
- **Quality Control:** ESLint, Prettier, TypeScript, and Husky pre-commit hooks

## Project Structure

```text
bloca-admin/
├── src/
│   ├── assets/       # Static assets & icons
│   ├── components/   # UI components & admin panel layout
│   ├── hooks/        # Custom React hooks & state stores
│   ├── routes/       # TanStack Router file-based routes
│   ├── index.css     # Global styles & Tailwind configuration
│   └── main.tsx      # Application entry point
├── package.json
└── vite.config.ts
```

## Related Repositories

- [`bloca-api`](https://github.com/integratech-org/bloca-api) - Backend REST API service
- [`bloca-firmware`](https://github.com/integratech-org/bloca-firmware) - IoT microcontroller firmware
- [`bloca-ml`](https://github.com/integratech-org/bloca-ml) - Machine learning grading service
