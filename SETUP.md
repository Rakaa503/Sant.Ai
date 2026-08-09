# Setup Guide

## Prerequisites

- **Node.js** >= 20 (pnpm is installed via nvm, e.g. `~/.config/nvm/versions/node/v24.14.1/bin`)
- **pnpm** >= 9
- **PostgreSQL** >= 15 (or [Neon](https://neon.tech) serverless Postgres)
- **Git**

---

## Quick Start

```bash
# 1. Clone
git clone https://github.com/riuvan/Santet.git
cd Santet

# 2. Install dependencies
pnpm install

# 3. Copy environment variables into apps/web/.env
cp apps/web/.env.example apps/web/.env   # (create .env.example from SETUP.md if missing)

# 4. Fill in .env (see Environment Variables below)

# 5. Generate Prisma client and push schema
pnpm db:generate
pnpm db:push

# 6. Start development servers (web + API server in parallel)
pnpm dev
```

The web app runs at `http://localhost:3000` and the API/auth server at `http://localhost:3001`.

---

## Environment Variables

Single `.env` file lives in `apps/web/.env`. The server, Prisma CLI, and seed scripts load it explicitly.

```env
# Database
DATABASE_URL="postgresql://..."
DATABASE_URL_UNPOOLED="postgresql://..."

# Better Auth
BETTER_AUTH_SECRET="..."
# URL where the auth API server is mounted (apps/server)
BETTER_AUTH_URL="http://localhost:3001"
# URL the web auth client targets (same server)
NEXT_PUBLIC_AUTH_API_URL="http://localhost:3001"
# Public web origin
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# Resend (email)
RESEND_API_KEY="re_..."

# GitHub / Google OAuth (optional)
AUTH_GITHUB_ID="..."
AUTH_GITHUB_SECRET="..."
AUTH_GOOGLE_ID="..."
AUTH_GOOGLE_SECRET="..."

# GNews (news feed) / YouTube (video feed) / Linear
GNEWS_API_KEY="..."
YOUTUBE_API_KEY="..."
LINEAR_API_KEY="..."

# Firebase (optional, for additional auth)
NEXT_PUBLIC_FIREBASE_API_KEY="..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="..."
NEXT_PUBLIC_FIREBASE_PROJECT_ID="..."
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="..."
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="..."
NEXT_PUBLIC_FIREBASE_APP_ID="..."
```

---

## Available Commands

| Command              | Description                            |
| -------------------- | -------------------------------------- |
| `pnpm dev`           | Start web + API server in parallel     |
| `pnpm build`         | Prisma generate + production build     |
| `pnpm start`         | Start production web server            |
| `pnpm lint`          | Run ESLint in every workspace package  |
| `pnpm typecheck`     | Run TypeScript check in every package  |
| `pnpm db:push`       | Push schema to database                |
| `pnpm db:generate`   | Regenerate Prisma client               |
| `pnpm db:seed`       | Seed database                          |
| `pnpm db:studio`     | Open Prisma Studio                     |

---

## Project Structure

```
sant.ai/
├── apps/
│   ├── web/                  # Next.js App Router (port 3000)
│   │   ├── src/app/          # Routes (App Router)
│   │   ├── src/components/   # Reusable React components
│   │   ├── src/lib/          # Utilities, server actions, auth client
│   │   └── .env              # Single env file for the whole monorepo
│   └── server/               # Hono API server (port 3001) — owns Better Auth /api/auth/*
│       └── src/index.ts      # Server entry: CORS + auth handler + health
├── packages/
│   └── shared/               # @santai/shared
│       ├── prisma/           # Schema + seed
│       └── src/              # db, auth config factory, email, reserved, generated client
├── pnpm-workspace.yaml
└── package.json              # Root orchestration scripts
```

---

## Architecture Notes

### Split Frontend / Backend

- **`apps/web`** (Next.js) handles UI, Server Actions, and the `src/proxy.ts` route guard.
- **`apps/server`** (Hono) owns the Better Auth HTTP API at `/api/auth/*` (sign-in, OTP, OAuth, sessions).
- **`packages/shared`** (`@santai/shared`) holds the Prisma schema/generated client and the `createAuth()` factory so both apps share one auth config. The web also instantiates auth in-process so Server Actions can call `auth.api.*` directly.
- Dev runs both apps on `localhost` — cookies are host-scoped, not port-scoped, so a session cookie set by the server on `localhost:3001` is sent to the web on `localhost:3000` too.

### Multi-Schema Database

The project uses Prisma with two PostgreSQL schemas:

- **`auth`** — Better Auth managed tables (users, sessions, accounts)
- **`Santai`** — Application tables (projects, teams, contributions)

### Auth

Authentication is handled by [Better Auth](https://better-auth.com). Config MUST stay in `packages/shared/src/auth.ts` (shared factory) — never fork it per-app. `trustedOrigins` includes the web origin so social sign-in works cross-origin.

### Styling

- Tailwind CSS v4 with CSS-first configuration via `@theme` directive
- CSS custom properties for theme tokens (light/dark mode)
- Radix UI primitives for interactive components
- shadcn/ui-style component wrappers
