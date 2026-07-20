# bloca-admin

Admin dashboard frontend for the BLOCA platform.

## Tech stack

- React 19 + TypeScript
- Vite 8
- TanStack Router + TanStack Query
- Tailwind CSS 4 + shadcn/ui
- Zustand

## Prerequisites

- Bun 1.x

## Getting started

```bash
# install dependencies
bun install

# run development server
bun run dev
```

Open the app at the local URL printed by Vite (usually `http://localhost:5173`).

## Available scripts

- `bun run dev` — start local development server
- `bun run build` — type-check and create production build
- `bun run preview` — preview production build locally
- `bun run lint` — run ESLint
- `bun run lint:fix` — run ESLint and fix issues
- `bun run ts-check` — run TypeScript type checks
- `bun run prettier:check` — verify Prettier formatting
- `bun run prettier:fix` / `bun run format` — format codebase

## Project structure

```txt
src/
  components/    # reusable UI and layout components
  hooks/         # custom React hooks
  lib/           # utilities and static config (e.g., sidebar menu)
  routes/        # TanStack file-based routes
  main.tsx       # app entrypoint and router/query setup
```

## Current route behavior

- `/` redirects to `/dashboard`
- Root layout wraps pages with:
  - Admin panel layout
  - Tooltip provider
  - Sonner toaster notifications

## Notes

- There is currently no required `.env` file in this app.
- Husky and lint-staged are configured for local git hooks.
