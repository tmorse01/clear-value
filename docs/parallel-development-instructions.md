# Parallel Development Instructions

## Overview

This document provides instructions for 4 agents to work in parallel on the initial priority features for CompClear. Each agent will work on an independent feature that can be developed simultaneously.

**Important**: All agents should read the shared documentation first:

- `docs/technical-architecture.md` - System architecture
- `docs/data-models.md` - TypeScript interfaces and data structures
- `docs/api-specification.md` - API contract specifications
- `docs/design-system.md` - Design guidelines (for frontend work)
- `docs/tech-stack-decisions.md` - Technology choices

## Project Setup

### Prerequisites

- Node.js 22 (use `.nvmrc`: `nvm use`)
- pnpm 8.0.0+
- Git

### Initial Setup

```bash
# Clone and install
pnpm install

# Build shared package (required for all agents)
pnpm --filter @clearvalue/shared build

# Start dev servers (if needed)
pnpm dev
```

### Project Structure

```
clear-value/
├── apps/
│   ├── api/              # Fastify backend
│   │   ├── src/
│   │   │   ├── routes/    # API routes
│   │   │   ├── services/  # Business logic
│   │   │   └── utils/     # Utilities
│   │   └── package.json
│   │
│   └── web/               # React frontend
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   └── hooks/
│       └── package.json
│
└── packages/
    └── shared/            # Shared types & schemas
        └── src/
            ├── types.ts
            └── schemas.ts
```

### Shared Package

All agents must use types from `@clearvalue/shared`. After updating shared types:

```bash
pnpm --filter @clearvalue/shared build
```

---

## Agent 1: CSV Parser Service & API Endpoint

### Objective

Build a CSV parsing service that accepts MLS/Cloud CMA/RPR CSV exports and returns normalized comparable property data.

### Tasks

1. **Create CSV Parser Service**

   - Location: `apps/api/src/services/parser/csvParser.ts`
   - Parse CSV files with flexible column name mapping
   - Support common formats: NWMLS, Cloud CMA, RPR
   - Validate required fields
   - Normalize data types

2. **Create API Endpoint**

   - Location: `apps/api/src/routes/parser.ts`
   - Endpoint: `POST /api/v1/parser/csv`
   - Accept multipart/form-data file upload
   - Return parsed comps with errors/warnings

3. **Add Zod Schemas**

   - Location: `packages/shared/src/schemas.ts`
   - Create `CSVRowSchema` for validation
   - Create `ComparablePropertySchema` for output

4. **Error Handling**
   - Handle invalid CSV format
   - Handle missing required fields
   - Return detailed error messages

### API Contract

**Endpoint**: `POST /api/v1/parser/csv`

**Request**: `multipart/form-data` with `file` field

**Success Response** (200):

```json
{
  "success": true,
  "comps": [
    {
      "address": "123 Main St, Bellingham, WA 98225",
      "salePrice": 450000,
      "saleDate": "2024-01-15",
      "gla": 2500,
      "beds": 3,
      "baths": 2.5,
      "lotSize": 0.25,
      "yearBuilt": 2010,
      "latitude": 48.7519,
      "longitude": -122.4787
    }
  ],
  "errors": [],
  "warnings": []
}
```

**Error Response** (400):

```json
{
  "success": false,
  "error": "Invalid CSV format",
  "details": "Missing required field: salePrice"
}
```

### Required Fields

- `address` (or variations: "Property Address", "Address")
- `salePrice` (or: "Sale Price", "Sold Price")
- `saleDate` (or: "Sale Date", "Close Date")
- `gla` (or: "Square Feet", "Living Area")
- `beds` (or: "Bedrooms", "Beds")
- `baths` (or: "Bathrooms", "Baths")
- `yearBuilt` (or: "Year Built")

### Optional Fields

- `lotSize` (or: "Lot Size", "Lot Acres")
- `latitude` / `longitude` (or: "Lat", "Lng")
- `propertyType`
- `condition`

### Dependencies

- `@fastify/multipart` - File upload handling
- `csv-parse` or `papaparse` - CSV parsing
- `@clearvalue/shared` - Types and schemas

### Testing

Create test CSV files with:

- Valid data
- Missing required fields
- Invalid data types
- Various column name formats

### Acceptance Criteria

- ✅ Parses CSV files with flexible column names
- ✅ Validates required fields
- ✅ Returns normalized `ComparableProperty[]`
- ✅ Handles errors gracefully
- ✅ Returns warnings for missing optional fields
- ✅ API endpoint responds correctly

### Files to Create/Modify

- `apps/api/src/services/parser/csvParser.ts`
- `apps/api/src/routes/parser.ts`
- `packages/shared/src/schemas.ts` (add CSV schemas)
- `apps/api/src/index.ts` (register route)

---

## Agent 2: Subject Property Validation Service & API Endpoint

### Objective

Build a validation service and API endpoint for subject property data entry with geocoding support.

### Tasks

1. **Create Validation Service**

   - Location: `apps/api/src/services/subject/validator.ts`
   - Validate subject property data
   - Calculate age from yearBuilt
   - Normalize property type and condition enums

2. **Create Geocoding Service** (Optional for MVP)

   - Location: `apps/api/src/services/subject/geocoding.ts`
   - Integrate Google Maps Geocoding API
   - Convert address to coordinates
   - Handle geocoding errors gracefully

3. **Create API Endpoint**

   - Location: `apps/api/src/routes/subject.ts`
   - Endpoint: `POST /api/v1/subject/validate`
   - Accept JSON subject property data
   - Return validated and normalized data

4. **Add Zod Schemas**
   - Location: `packages/shared/src/schemas.ts`
   - Create `SubjectPropertyInputSchema`
   - Create `SubjectPropertyOutputSchema`

### API Contract

**Endpoint**: `POST /api/v1/subject/validate`

**Request**:

```json
{
  "address": "456 Oak Ave, Bellingham, WA 98225",
  "beds": 4,
  "baths": 3,
  "gla": 2800,
  "lotSize": 0.3,
  "yearBuilt": 2023,
  "propertyType": "single_family",
  "condition": "new_construction",
  "notes": "Custom finishes, as-complete"
}
```

**Success Response** (200):

```json
{
  "valid": true,
  "normalized": {
    "address": "456 Oak Ave, Bellingham, WA 98225",
    "coordinates": {
      "latitude": 48.752,
      "longitude": -122.4788
    },
    "beds": 4,
    "baths": 3,
    "gla": 2800,
    "lotSize": 0.3,
    "yearBuilt": 2023,
    "age": 1,
    "propertyType": "single_family"
  }
}
```

**Error Response** (400):

```json
{
  "valid": false,
  "errors": [
    {
      "field": "gla",
      "message": "GLA must be between 100 and 20000 sqft"
    }
  ]
}
```

### Validation Rules

- `beds`: 1-10
- `baths`: 0.5-10 (increment 0.5)
- `gla`: 100-20,000 sqft
- `lotSize`: 0.01-100 acres
- `yearBuilt`: 1800-current year
- `address`: Non-empty string
- `propertyType`: Must be valid enum value

### Geocoding

- Use Google Maps Geocoding API
- Environment variable: `GOOGLE_MAPS_API_KEY`
- If geocoding fails, still return valid response (coordinates optional)
- Cache results if possible (future optimization)

### Dependencies

- `@googlemaps/google-maps-services-js` - Google Maps API client
- `@clearvalue/shared` - Types and schemas

### Testing

Test with:

- Valid subject property
- Invalid field values
- Missing required fields
- Invalid addresses (geocoding failure)

### Acceptance Criteria

- ✅ Validates all subject property fields
- ✅ Calculates age from yearBuilt
- ✅ Normalizes enum values
- ✅ Geocodes addresses (optional, graceful failure)
- ✅ Returns detailed validation errors
- ✅ API endpoint responds correctly

### Files to Create/Modify

- `apps/api/src/services/subject/validator.ts`
- `apps/api/src/services/subject/geocoding.ts` (optional)
- `apps/api/src/routes/subject.ts`
- `packages/shared/src/schemas.ts` (add subject schemas)
- `apps/api/src/index.ts` (register route)

---

## Agent 3: Regression Engine Service

### Objective

Build the core regression engine that calculates property valuations using linear regression on comparable properties.

### Tasks

1. **Create Regression Service**

   - Location: `apps/api/src/services/regression/regressionEngine.ts`
   - Implement linear regression algorithm
   - Calculate coefficients for: GLA, beds, baths, lot, age, distance, time
   - Calculate R-squared and adjusted R-squared
   - Calculate standard error

2. **Create Adjustment Calculator**

   - Location: `apps/api/src/services/regression/adjustmentCalculator.ts`
   - Calculate adjustments for each comp
   - Calculate adjusted prices
   - Calculate residuals

3. **Create Outlier Detection**

   - Location: `apps/api/src/services/regression/outlierDetection.ts`
   - Detect outliers using residual analysis
   - Mark comps as outliers if residual > threshold

4. **Create Confidence Scorer**

   - Location: `apps/api/src/services/regression/confidenceScorer.ts`
   - Calculate confidence score (0-1)
   - Assign confidence grade (A-D)
   - Calculate value range

5. **Create Similarity Scorer**
   - Location: `apps/api/src/services/regression/similarityScorer.ts`
   - Calculate similarity score for each comp
   - Weighted factors: GLA, beds/baths, age, distance, lot, recency

### Algorithm Requirements

**Linear Regression**:

- Use Ordinary Least Squares (OLS)
- Features: GLA, beds, baths, lotSize, age, distance (optional), time (optional)
- Calculate: coefficients, R², adjusted R², standard error

**Adjustments**:

```
adjustment = (subject_value - comp_value) * coefficient
adjusted_price = comp_sale_price + sum(all_adjustments)
```

**Confidence Score**:

- Based on: R², number of comps, standard error, comp quality
- Formula: `(rSquared * 0.5) + (compQuality * 0.3) + (1 - normalizedStdError * 0.2)`

**Confidence Grades**:

- A: 0.85-1.0
- B: 0.70-0.84
- C: 0.55-0.69
- D: < 0.55

### Input/Output

**Input**:

```typescript
{
  subject: SubjectProperty;
  comps: ComparableProperty[];
  config: RegressionConfig;
}
```

**Output**:

```typescript
{
  coefficients: RegressionCoefficients;
  metrics: RegressionMetrics;
  adjustedComps: AdjustedComparable[];
  outliers: string[]; // Comp addresses
}
```

### Dependencies

- `ml-matrix` or `simple-statistics` - Math utilities (or implement OLS manually)
- `@clearvalue/shared` - Types

### Testing

Create unit tests with:

- Known input/output pairs
- Edge cases (few comps, outliers, missing data)
- Validate mathematical correctness

### Acceptance Criteria

- ✅ Calculates regression coefficients correctly
- ✅ Calculates adjustments for all comps
- ✅ Detects outliers accurately
- ✅ Calculates confidence scores
- ✅ Handles edge cases (few comps, missing data)
- ✅ All calculations are mathematically sound

### Files to Create/Modify

- `apps/api/src/services/regression/regressionEngine.ts`
- `apps/api/src/services/regression/adjustmentCalculator.ts`
- `apps/api/src/services/regression/outlierDetection.ts`
- `apps/api/src/services/regression/confidenceScorer.ts`
- `apps/api/src/services/regression/similarityScorer.ts`
- `apps/api/src/services/regression/index.ts` (exports)

### Mathematical Notes

**OLS Regression**:

```
y = Xβ + ε
β = (X'X)^(-1)X'y
```

Where:

- `y` = sale prices (vector)
- `X` = feature matrix (with intercept column)
- `β` = coefficients (vector)
- `ε` = residuals (vector)

**R-squared**:

```
R² = 1 - (SS_res / SS_tot)
```

**Adjusted R-squared**:

```
R²_adj = 1 - [(1 - R²)(n - 1) / (n - p - 1)]
```

Where:

- `n` = number of observations
- `p` = number of features

---

## Agent 4: Report Generation Service & API Endpoint

### Objective

Build a service that assembles complete report data structures and an API endpoint to generate reports.

### Tasks

1. **Create Report Generator Service**

   - Location: `apps/api/src/services/report/reportGenerator.ts`
   - Assemble complete report structure
   - Integrate with regression engine
   - Calculate similarity scores
   - Generate chart data

2. **Create Chart Data Generator**

   - Location: `apps/api/src/services/report/chartDataGenerator.ts`
   - Generate Price vs GLA scatter plot data
   - Generate price distribution data
   - Generate sale price trend data
   - Generate regression line points

3. **Create API Endpoint**

   - Location: `apps/api/src/routes/report.ts`
   - Endpoint: `POST /api/v1/report/generate`
   - Accept subject + comps + config
   - Return complete report JSON

4. **Create Report ID Generator**
   - Location: `apps/api/src/services/report/reportId.ts`
   - Generate unique report IDs
   - Format: `report_<timestamp>_<random>`

### API Contract

**Endpoint**: `POST /api/v1/report/generate`

**Request**:

```json
{
  "subject": {
    "address": "456 Oak Ave, Bellingham, WA 98225",
    "beds": 4,
    "baths": 3,
    "gla": 2800,
    "lotSize": 0.3,
    "yearBuilt": 2023,
    "propertyType": "single_family"
  },
  "comps": [
    {
      "address": "123 Main St",
      "salePrice": 450000,
      "saleDate": "2024-01-15",
      "gla": 2500,
      "beds": 3,
      "baths": 2.5,
      "lotSize": 0.25,
      "yearBuilt": 2010,
      "latitude": 48.7519,
      "longitude": -122.4787
    }
  ],
  "config": {
    "modelType": "linear",
    "includeTimeAdjustment": true,
    "minComps": 3,
    "maxComps": 15
  }
}
```

**Success Response** (200):

```json
{
  "reportId": "report_abc123",
  "subject": {
    /* normalized subject */
  },
  "valuation": {
    "estimatedValue": 485000,
    "valueRange": {
      "low": 460000,
      "high": 510000
    },
    "confidenceGrade": "B",
    "confidenceScore": 0.78
  },
  "regression": {
    "modelType": "linear",
    "coefficients": {
      /* coefficients */
    },
    "rSquared": 0.85,
    "adjustedRSquared": 0.82,
    "standardError": 25000
  },
  "comps": [
    /* adjusted comps */
  ],
  "outliers": [],
  "charts": {
    "priceVsGla": {
      /* chart data */
    },
    "priceDistribution": {
      /* chart data */
    },
    "salePriceTrend": {
      /* chart data */
    }
  },
  "metadata": {
    "generatedAt": "2024-01-20T10:30:00Z",
    "compCount": 8,
    "modelVersion": "1.0"
  }
}
```

**Error Response** (400):

```json
{
  "error": "Insufficient comps",
  "message": "Minimum 3 comps required, received 2",
  "code": "INSUFFICIENT_COMPS"
}
```

### Chart Data Formats

**Price vs GLA**:

```typescript
{
  data: Array<{
    gla: number;
    price: number;
    adjustedPrice?: number;
    isSubject?: boolean;
  }>;
  regressionLine: Array<{
    gla: number;
    price: number;
  }>;
}
```

**Price Distribution**:

```typescript
{
  adjusted: number[];
  unadjusted: number[];
}
```

**Sale Price Trend**:

```typescript
Array<{
  date: string;
  price: number;
  adjustedPrice: number;
}>;
```

### Integration Points

- Use Agent 3's regression engine service
- Use Agent 2's subject validation (if needed)
- Use Agent 1's comp data format

### Dependencies

- `@clearvalue/shared` - Types
- Agent 3's regression service (import from `services/regression`)

### Testing

Test with:

- Valid subject + comps
- Insufficient comps (< 3)
- Edge cases (all outliers, identical comps)
- Various comp counts

### Acceptance Criteria

- ✅ Generates complete report structure
- ✅ Integrates with regression engine
- ✅ Generates all chart data formats
- ✅ Calculates similarity scores
- ✅ Handles errors gracefully
- ✅ Returns proper error codes
- ✅ API endpoint responds correctly

### Files to Create/Modify

- `apps/api/src/services/report/reportGenerator.ts`
- `apps/api/src/services/report/chartDataGenerator.ts`
- `apps/api/src/services/report/reportId.ts`
- `apps/api/src/routes/report.ts`
- `apps/api/src/services/report/index.ts` (exports)
- `apps/api/src/index.ts` (register route)

---

## Shared Requirements (All Agents)

### Code Style

- **TypeScript**: Strict mode, use shared types
- **Naming**: camelCase for variables, PascalCase for types/classes
- **Error Handling**: Always return structured error responses
- **Validation**: Use Zod schemas for all inputs
- **Comments**: Document complex algorithms and business logic

### Error Handling

All API endpoints should:

- Return appropriate HTTP status codes
- Include error codes (see `api-specification.md`)
- Provide helpful error messages
- Log errors for debugging

### Testing

- Write unit tests for core logic
- Test edge cases and error scenarios
- Use Vitest (already configured)
- Aim for >80% coverage on business logic

### Dependencies

When adding dependencies:

1. Check if it's already in the project
2. Use `pnpm add <package>` in the correct workspace
3. Update this document if adding a new dependency

### Git Workflow

- Create feature branch: `feature/agent-<number>-<feature-name>`
- Commit frequently with clear messages
- Use conventional commits: `feat:`, `fix:`, `refactor:`, etc.
- Push to remote regularly

### Communication

- Update shared types in `packages/shared` first
- Rebuild shared package after type changes
- Coordinate if you need to modify shared code
- Document any assumptions or decisions

### Fastify Setup

All routes should:

- Use Fastify plugins pattern
- Register with `fastify.register()`
- Use async/await
- Return JSON responses

Example route structure:

```typescript
import { FastifyPluginAsync } from "fastify";

const route: FastifyPluginAsync = async (fastify) => {
  fastify.post("/endpoint", async (request, reply) => {
    // Implementation
  });
};

export default route;
```

### Environment Variables

Add to `apps/api/.env`:

```env
PORT=3000
GOOGLE_MAPS_API_KEY=your_key_here
```

---

## Integration Checklist

After all agents complete their features:

- [ ] All routes registered in `apps/api/src/index.ts`
- [ ] All services exported properly
- [ ] Shared types are complete and built
- [ ] All endpoints tested manually
- [ ] Error handling is consistent
- [ ] Code follows style guidelines
- [ ] Dependencies are documented

---

## Questions & Support

If you encounter issues or need clarification:

1. Check existing documentation first
2. Review shared types and schemas
3. Test your code in isolation
4. Document any blockers or assumptions

---

## Success Criteria

Each agent's feature is complete when:

1. ✅ All code is written and follows style guidelines
2. ✅ Unit tests pass (if written)
3. ✅ API endpoint responds correctly (test with curl/Postman)
4. ✅ Error handling is robust
5. ✅ Code is committed to feature branch
6. ✅ Documentation is updated (if needed)

Good luck! 🚀
