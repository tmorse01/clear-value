# Tech Stack Decisions

Quick reference for all technology decisions made for CompClear.

## Frontend

| Category         | Choice                         | Notes                                        |
| ---------------- | ------------------------------ | -------------------------------------------- |
| Framework        | React 18+                      | With React Compiler                          |
| Build Tool       | Vite                           | Fast dev server                              |
| UI Library       | Material UI                    | Primary component library                    |
| Styling          | CSS Modules + MUI `sx`         | Prefer CSS Modules, use `sx` for one-offs    |
| State Management | TanStack Query + React Context | Query for server state, Context for UI state |
| Charts           | Material UI Charts             | Recharts as fallback                         |
| Testing          | Vitest                         | Unit & integration tests                     |
| E2E Testing      | Playwright                     | Post-MVP                                     |

## Backend

| Category           | Choice                 | Notes                                  |
| ------------------ | ---------------------- | -------------------------------------- |
| Framework          | Fastify                | High performance                       |
| Runtime            | Node.js 22             |                                        |
| Validation         | Zod                    | Type-safe schemas                      |
| ORM                | Prisma                 | Type-safe database access              |
| Database           | PostgreSQL             | Hosted on Railway                      |
| PDF Generation     | Puppeteer + Handlebars | Or PDFKit alternative                  |
| Geocoding          | Google Maps API        | API key required                       |
| Regression Library | TBD                    | ml-matrix / simple-statistics / custom |
| Testing            | Vitest                 | Unit & integration tests               |
| Logging            | Winston / Pino         | Structured logging                     |

## Infrastructure

| Category         | Choice                        | Notes                                 |
| ---------------- | ----------------------------- | ------------------------------------- |
| Hosting          | Railway                       | Both frontend and backend             |
| Database Hosting | Railway                       | PostgreSQL                            |
| File Storage     | Railway                       | If possible, otherwise S3             |
| Domain           | clearvalue.taylormorsedev.com | Temporary, custom domain later        |
| CI/CD            | Railway                       | Auto-deploy with migrations           |
| Monitoring       | Railway + Logging             | Built-in monitoring + structured logs |

## Business Services (Post-MVP)

| Category       | Choice | Notes                      |
| -------------- | ------ | -------------------------- |
| Payment        | Stripe | Post-MVP                   |
| Authentication | Auth0  | Free tier                  |
| Email          | TBD    | For reports, notifications |

## Design System

- **Primary Color**: Default Material UI blue (#2196f3)
- **Theme**: Clean, trusted, professional
- **Typography**: System font stack
- **Spacing**: 8px base unit (Material UI default)
- **Components**: Material UI with custom theme

See `design-system.md` for full details.

## Development Tools

| Category        | Choice               |
| --------------- | -------------------- |
| Package Manager | pnpm 8.0.0+          |
| Monorepo        | pnpm workspaces      |
| TypeScript      | Strict mode          |
| Git             | Conventional commits |
| IDE             | VS Code recommended  |

## Project Structure

```
clear-value/
├── apps/
│   ├── api/          # Fastify backend
│   └── web/          # React frontend
├── packages/
│   └── shared/       # Shared types & schemas
└── docs/             # Documentation
```

## Key Principles

1. **Type Safety**: TypeScript + Zod schemas throughout
2. **Performance**: Fastify, React Compiler, optimized builds
3. **Developer Experience**: Hot reload, shared types, clear structure
4. **Scalability**: Prisma migrations, Railway auto-scaling
5. **Maintainability**: Clear separation of concerns, comprehensive docs

## Environment Variables

### Backend (`apps/api/.env`)

- `PORT` - Server port (default: 3000)
- `DATABASE_URL` - PostgreSQL connection string
- `GOOGLE_MAPS_API_KEY` - Geocoding API key
- `AUTH0_DOMAIN` - Auth0 domain (post-MVP)
- `AUTH0_CLIENT_ID` - Auth0 client ID (post-MVP)
- `AUTH0_CLIENT_SECRET` - Auth0 client secret (post-MVP)
- `STRIPE_SECRET_KEY` - Stripe secret key (post-MVP)

### Frontend (`apps/web/.env`)

- `VITE_API_URL` - Backend API URL
- `VITE_AUTH0_DOMAIN` - Auth0 domain (post-MVP)
- `VITE_AUTH0_CLIENT_ID` - Auth0 client ID (post-MVP)

## Next Steps

1. ✅ Tech stack decisions complete
2. ⏳ Set up Prisma schema
3. ⏳ Configure Material UI theme
4. ⏳ Set up Railway deployment
5. ⏳ Implement core features
