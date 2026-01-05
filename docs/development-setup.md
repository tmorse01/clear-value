# Development Setup

## Prerequisites

- Node.js 22 (use `.nvmrc` file: `nvm use`)
- pnpm 8.0.0+
- PostgreSQL (via Railway CLI or Docker)
- Git

## Initial Setup

### 1. Clone and Install

```bash
# Install dependencies
pnpm install

# Build shared package
pnpm --filter @clearvalue/shared build
```

### 2. Environment Variables

Create `.env` files in each app:

**`apps/api/.env`**:

```env
# Server
PORT=3000
NODE_ENV=development

# Database (Railway or local)
DATABASE_URL=postgresql://user:password@localhost:5432/clearvalue

# Google Maps API
GOOGLE_MAPS_API_KEY=your_api_key_here

# Auth0 (post-MVP)
AUTH0_DOMAIN=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=

# Stripe (post-MVP)
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
```

**`apps/web/.env`**:

```env
VITE_API_URL=http://localhost:3000/api
VITE_AUTH0_DOMAIN=
VITE_AUTH0_CLIENT_ID=
```

### 3. Database Setup

```bash
# Generate Prisma client
cd apps/api
pnpm prisma generate

# Run migrations (when ready)
pnpm prisma migrate dev

# Or use Railway CLI
railway link
railway run pnpm prisma migrate deploy
```

### 4. Start Development Servers

```bash
# From root directory
pnpm dev

# This will start:
# - Frontend: http://localhost:5173
# - Backend: http://localhost:3000
```

## Project Structure

```
clear-value/
├── apps/
│   ├── api/              # Fastify backend
│   │   ├── src/
│   │   │   ├── routes/    # API routes
│   │   │   ├── services/  # Business logic
│   │   │   │   ├── regression/
│   │   │   │   ├── parser/
│   │   │   │   ├── pdf/
│   │   │   │   └── report/
│   │   │   ├── utils/     # Utilities
│   │   │   └── index.ts   # Server entry
│   │   ├── prisma/        # Prisma schema & migrations
│   │   └── package.json
│   │
│   └── web/               # React frontend
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   ├── hooks/
│       │   ├── contexts/
│       │   ├── services/
│       │   └── main.tsx
│       └── package.json
│
├── packages/
│   └── shared/            # Shared types & utilities
│       ├── src/
│       │   ├── types.ts
│       │   ├── schemas.ts # Zod schemas
│       │   └── utils.ts
│       └── package.json
│
└── docs/                  # Documentation
```

## Development Workflow

### Adding a New Feature

1. **Update Types** (if needed):

   ```bash
   # Edit packages/shared/src/types.ts
   # Build shared package
   pnpm --filter @clearvalue/shared build
   ```

2. **Backend**:

   - Add route in `apps/api/src/routes/`
   - Add service logic in `apps/api/src/services/`
   - Add Zod validation schema in `packages/shared/src/schemas.ts`

3. **Frontend**:
   - Create component in `apps/web/src/components/`
   - Add page in `apps/web/src/pages/`
   - Use TanStack Query for API calls
   - Use React Context for global state

### Running Tests

```bash
# Unit tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage
pnpm test:coverage

# E2E tests (post-MVP)
pnpm test:e2e
```

### Database Migrations

```bash
# Create a new migration
cd apps/api
pnpm prisma migrate dev --name migration_name

# Apply migrations (production)
pnpm prisma migrate deploy

# Reset database (development only)
pnpm prisma migrate reset
```

### Building for Production

```bash
# Build all packages
pnpm build

# Build specific package
pnpm --filter @clearvalue/web build
pnpm --filter @clearvalue/api build
```

## Code Style

### TypeScript

- Strict mode enabled
- Use shared types from `@clearvalue/shared`
- Prefer interfaces over types for public APIs

### React

- Use React Compiler (automatic memoization)
- Functional components only
- Custom hooks for reusable logic
- TanStack Query for server state
- React Context for global UI state

### Styling

- Material UI components as base
- CSS Modules for component-specific styles
- MUI `sx` prop for one-off styling
- Follow design system (see `design-system.md`)

### API

- Fastify plugins for organization
- Zod schemas for validation
- Consistent error responses
- RESTful conventions

## Git Workflow

### Branching

- `main`: Production-ready code
- `develop`: Integration branch
- `feature/*`: New features
- `fix/*`: Bug fixes
- `docs/*`: Documentation updates

### Commits

- Use conventional commits
- Examples:
  - `feat: add CSV parser endpoint`
  - `fix: correct regression calculation`
  - `docs: update API specification`

## Railway Deployment

### Setup

1. Install Railway CLI:

   ```bash
   npm i -g @railway/cli
   ```

2. Login:

   ```bash
   railway login
   ```

3. Link project:
   ```bash
   railway link
   ```

### Environment Variables

Set in Railway dashboard or via CLI:

```bash
railway variables set DATABASE_URL=postgresql://...
railway variables set GOOGLE_MAPS_API_KEY=...
```

### Deploy

```bash
# Deploy to production
railway up

# Or push to main branch (auto-deploy)
git push origin main
```

### CI/CD

Railway automatically:

- Builds on push to main
- Runs Prisma migrations
- Deploys to production

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or change port in .env
PORT=3001
```

### Prisma Client Not Found

```bash
cd apps/api
pnpm prisma generate
```

### Shared Package Not Found

```bash
# Rebuild shared package
pnpm --filter @clearvalue/shared build

# Or from root
pnpm build --filter @clearvalue/shared
```

### Database Connection Issues

- Check `DATABASE_URL` in `.env`
- Verify PostgreSQL is running
- Test connection: `pnpm prisma db pull`

## Useful Commands

```bash
# Install dependencies
pnpm install

# Run all dev servers
pnpm dev

# Build all packages
pnpm build

# Type check
pnpm typecheck

# Lint
pnpm lint

# Test
pnpm test

# Clean build artifacts
pnpm clean
```

## IDE Setup

### VS Code Extensions

- ESLint
- Prettier
- Prisma
- TypeScript and JavaScript Language Features

### Recommended Settings

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.tsdk": "node_modules/typescript/lib"
}
```
