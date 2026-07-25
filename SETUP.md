# Setup Guide — Bloca Admin (`bloca-admin`)

Follow these instructions to set up, run, and develop the `bloca-admin` dashboard locally.

## Prerequisites

- **Node.js**: Version 18.x or higher (Node 20+ recommended)
- **Package Manager**: `bun` (preferred) or `npm`

## Installation

1. Navigate to the project directory:

   ```bash
   cd bloca-admin
   ```

2. Install dependencies:
   ```bash
   bun install
   # or
   npm install
   ```

## Development

Start the development server with hot module reloading:

```bash
bun run dev
# or
npm run dev
```

The application will be available at `http://localhost:5173` (or the port specified in your terminal).

## Building for Production

Build the optimized production bundle:

```bash
bun run build
# or
npm run build
```

Preview the production build locally:

```bash
bun run preview
# or
npm run preview
```

## Code Quality & Linting

- **Type Checking:**
  ```bash
  bun run ts-check
  ```
- **Linting:**
  ```bash
  bun run lint
  ```
- **Formatting (Prettier):**
  ```bash
  bun run prettier:check
  bun run prettier:fix
  ```
