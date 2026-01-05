# CompClear API

Fastify-based REST API for CompClear real estate valuation platform.

## Tech Stack

- **Runtime**: Node.js 22+
- **Framework**: Fastify 5+
- **Language**: TypeScript
- **Validation**: Zod
- **ORM**: Prisma (Post-MVP)
- **Database**: PostgreSQL (Post-MVP)

## Project Structure

```
src/
├── config/          # Configuration files
│   └── env.ts       # Environment configuration
├── plugins/         # Fastify plugins
│   ├── request-id.ts        # Request ID middleware
│   ├── request-logging.ts   # Request/response logging
│   └── rate-limit.ts        # Rate limiting (optional)
├── routes/          # API route handlers
│   ├── health.ts    # Health check endpoint
│   └── v1/          # API v1 routes
├── services/        # Business logic services
│   ├── parser/      # CSV parsing service
│   ├── regression/  # Regression engine
│   ├── report/      # Report generation
│   └── pdf/         # PDF export service
├── types/           # TypeScript type definitions
│   └── fastify.d.ts # Fastify type extensions
└── utils/           # Utility functions
    ├── errors.ts    # Custom error classes
    ├── logger.ts    # Logger utilities
    ├── validation.ts # Zod validation helpers
    └── index.ts     # Utility exports
```

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm 8+

### Installation

```bash
# Install dependencies from root
pnpm install
```

### Development

```bash
# Run API server in development mode
pnpm --filter api dev

# Or from the api directory
cd apps/api
pnpm dev
```

The server will start on `http://localhost:3000` by default.

### Environment Variables

Create a `.env` file in `apps/api/` (see `.env.example` for reference):

```env
PORT=3000
HOST=0.0.0.0
NODE_ENV=development
```

## API Endpoints

### Health Check

```
GET /health
```

Returns server status and timestamp.

### API v1

All v1 endpoints are prefixed with `/api/v1`:

- `/api/v1/parser/csv` - Parse CSV files (TODO)
- `/api/v1/subject/validate` - Validate subject property (TODO)
- `/api/v1/report/generate` - Generate valuation report (TODO)
- `/api/v1/report/export-pdf` - Export report as PDF (TODO)

See `docs/api-specification.md` for detailed API documentation.

## Services

### Parser Service

Handles CSV file parsing for MLS/Cloud CMA/RPR exports.

**Location**: `src/services/parser/`

### Regression Service

Runs linear/ridge regression analysis on comparable properties.

**Location**: `src/services/regression/`

### Report Service

Assembles complete report structure with charts and metadata.

**Location**: `src/services/report/`

### PDF Service

Generates PDF exports from report data.

**Location**: `src/services/pdf/`

## Infrastructure Features

### Logging

- **Structured Logging**: Uses Pino (Fastify's built-in logger) with structured JSON output
- **Request ID Tracking**: Every request gets a unique ID for tracing
- **Request/Response Logging**: Automatic logging of all requests with timing information
- **Error Logging**: Structured error logging with context
- **Development Mode**: Pretty-printed logs with pino-pretty

### Request Tracing

- **Request IDs**: Automatically generated UUIDs for each request
- **Header Support**: Accepts `X-Request-ID` header for distributed tracing
- **Response Headers**: Returns `X-Request-ID` in all responses

### Validation

- **Zod Integration**: Type-safe validation using Zod schemas
- **Helper Functions**: Utilities for validating body, query, and params
- **Pre-handlers**: Reusable validation middleware for routes

### Error Handling

The API uses custom error classes for consistent error responses:

- `ValidationError` - Input validation failures (400)
- `NotFoundError` - Resource not found (404)
- `InsufficientCompsError` - Not enough comparable properties (400)
- `RegressionError` - Regression calculation failures (500)
- `PDFGenerationError` - PDF export failures (500)

All errors follow this format:

```json
{
  "error": "Error Name",
  "message": "Human-readable message",
  "code": "ERROR_CODE",
  "details": {}
}
```

### Graceful Shutdown

The server handles graceful shutdown on:
- `SIGTERM` - Standard termination signal
- `SIGINT` - Interrupt signal (Ctrl+C)
- Uncaught exceptions
- Unhandled promise rejections

All in-flight requests are allowed to complete before shutdown.

## Development Notes

- The API is currently stateless (MVP phase)
- No database required for MVP
- All services are scaffolded with placeholder implementations
- See `docs/technical-architecture.md` for architecture details

## Using Validation Helpers

Example of using Zod validation in a route:

```typescript
import { z } from 'zod';
import { createBodyValidator } from '../utils/validation.js';

const createReportSchema = z.object({
  subject: z.object({ /* ... */ }),
  comps: z.array(z.object({ /* ... */ })),
});

export const reportRouter: FastifyPluginAsync = async (fastify) => {
  fastify.post(
    '/generate',
    {
      preHandler: [createBodyValidator(createReportSchema)],
    },
    async (request, reply) => {
      // request.body is now typed and validated
      const { subject, comps } = request.body;
      // ...
    }
  );
};
```

## Logging in Routes

Use the request logger for contextual logging:

```typescript
export const myRouter: FastifyPluginAsync = async (fastify) => {
  fastify.get('/example', async (request, reply) => {
    // Logger includes request ID automatically
    request.log.info({ data: 'example' }, 'Processing request');
    return { success: true };
  });
};
```

## Building

```bash
pnpm --filter api build
```

Output will be in `apps/api/dist/`.

## Production

```bash
pnpm --filter api start
```

Ensure `NODE_ENV=production` is set in your environment.

