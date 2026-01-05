# Technical Architecture

## Overview

CompClear is a monorepo-based application consisting of:

- **Web Frontend** (React + TypeScript + Vite)
- **API Backend** (Node.js + TypeScript)
- **Shared Package** (TypeScript types and utilities)

## Tech Stack

### Frontend (`apps/web`)

- **Framework**: React 19+ with React Compiler
- **Build Tool**: Vite
- **Language**: TypeScript
- **UI Library**: Material UI (MUI)
- **Styling**: CSS Modules + MUI's `sx` prop system
- **State Management**: TanStack Query + React Context
- **Charts**: Material UI Charts (primary), Recharts (fallback)
- **Design System**: Custom design system with default primary blue theme (see `design-system.md`)

### Backend (`apps/api`)

- **Runtime**: Node.js 22
- **Framework**: Fastify
- **Language**: TypeScript
- **Validation**: Zod
- **ORM**: Prisma
- **Database**: PostgreSQL (Railway)
- **PDF Generation**: Separate service using Puppeteer + Handlebars templates (or PDFKit)
- **Geocoding**: Google Maps Geocoding API
- **Regression Library**: TBD (ml-matrix / simple-statistics / custom)

### Shared (`packages/shared`)

- **Types**: Shared TypeScript interfaces
- **Utilities**: Common functions (validation, formatting, etc.)
- **Zod Schemas**: Shared validation schemas

## System Architecture

```
┌─────────────┐
│   Browser   │
│  (React)    │
└──────┬──────┘
       │ HTTP/REST
       │
┌──────▼──────┐
│   API       │
│  (Node.js)  │
└──────┬──────┘
       │
       ├─── Regression Engine
       ├─── Report Generator
       └─── PDF Export
```

## Core Components

### 1. Regression Engine

**Location**: `apps/api/src/services/regression/`

**Responsibilities**:

- Accept comp data + subject property
- Run linear/ridge regression
- Calculate adjustments
- Detect outliers
- Generate confidence scores

**Input**:

- Subject property features
- Comparable properties array
- Model configuration

**Output**:

- Regression coefficients
- Adjusted comp prices
- Residuals
- Confidence grade (A-D)
- Value estimate + range

### 2. Report Generator

**Location**: `apps/api/src/services/report/`

**Responsibilities**:

- Assemble report data structure
- Generate charts data
- Format for PDF export

**Output**: Report JSON structure

### 3. PDF Export Service

**Location**: `apps/api/src/services/pdf/`

**Responsibilities**:

- Convert report JSON to PDF
- Apply branding/templates
- Handle multi-page layout

**Implementation**:

- Separate PDF generation service
- Use Puppeteer to render HTML templates to PDF
- Handlebars for templating beautiful reports
- Alternative: PDFKit for programmatic PDF generation

### 4. CSV Parser

**Location**: `apps/api/src/services/parser/`

**Responsibilities**:

- Parse MLS/Cloud CMA/RPR CSV exports
- Validate required fields
- Normalize data formats
- Handle missing/optional fields

## Data Flow

### Report Generation Flow

```
1. User uploads CSV → API validates & parses
2. User enters subject property → API validates
3. User clicks "Generate Report" → API:
   a. Runs regression model
   b. Calculates adjustments
   c. Generates report structure
   d. Returns report JSON
4. Frontend displays report
5. User clicks "Export PDF" → API generates PDF → returns download
```

## Database Strategy

### Database: PostgreSQL (Railway)

**ORM**: Prisma

**Schema** (Post-MVP):

- User accounts (Auth0 integration)
- Saved reports
- Report history
- Templates
- User preferences

**MVP**: Stateless (no database required initially)

- All data in-memory during session
- Reports generated on-demand
- No persistence

**Migration Strategy**:

- Prisma migrations
- CI/CD automatically applies migrations on deploy

## Security Considerations

- **CSV Upload**: Validate file size, type, structure
- **Input Validation**: Sanitize all user inputs
- **Rate Limiting**: Prevent abuse of regression engine
- **PDF Generation**: Prevent resource exhaustion
- **CORS**: Configure appropriately for production

## Deployment Strategy

### Development

- Local development with hot reload
- Shared types via workspace
- Local PostgreSQL via Docker or Railway CLI

### Production

- **Hosting**: Railway (both frontend and backend)
- **Domain**: `clearvalue.taylormorsedev.com` (temporary, custom domain later)
- **Database**: PostgreSQL on Railway
- **File Storage**: Railway (if possible, otherwise S3)
- **CI/CD**: Automatic deployments with migration handling

### CI/CD Pipeline

- Automated testing (Vitest)
- Automatic Prisma migrations on deploy
- Environment variable management
- Build and deploy on push to main

## Performance Considerations

- **Regression Calculation**: Should complete in < 2 seconds for 15 comps
- **PDF Generation**: Should complete in < 5 seconds
- **Frontend**: Lazy load charts, optimize bundle size
- **Caching**: Cache regression results for identical inputs

## Testing Strategy

- **Unit Tests**: Vitest (regression engine, parsers, utilities)
- **Integration Tests**: Vitest (API endpoints, report generation)
- **E2E Tests**: Playwright (full report generation flow) - Post-MVP
- **Regression Tests**: Validate model outputs against known cases

**Note**: Focus on MVP first, then add comprehensive test coverage

## Future Considerations

- **Authentication**: Auth0 (free tier)
- **Payment Processing**: Stripe (post-MVP)
- **MLS Integration**: OAuth, API clients
- **Real-time Updates**: WebSocket for long-running calculations
- **Batch Processing**: Multiple reports in parallel
- **Analytics**: Track usage, model performance

## Logging & Monitoring

- **Logging**: Structured logging framework (Winston / Pino)
- **Monitoring**: Railway built-in monitoring
- **Error Tracking**: Railway logs + structured error logging
