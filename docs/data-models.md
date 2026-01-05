# Data Models

> **Note**: This documentation should be kept in sync with `packages/shared/src/types`. 
> The TypeScript types are the source of truth. When updating types, please update this document.

## TypeScript Interfaces

### Property Features (Base Interface)

```typescript
interface PropertyFeatures {
  gla: number; // Gross Living Area (sqft)
  beds: number;
  baths: number;
  lotSize: number; // Acres
  age: number; // Calculated from yearBuilt
  distance?: number; // Distance from subject (miles)
  [key: string]: unknown;
}
```

### Subject Property

### Subject Property

```typescript
interface SubjectProperty extends PropertyFeatures {
  address: string;
  yearBuilt: number;
  propertyType?: PropertyType;
  condition?: PropertyCondition;
  finishLevel?: FinishLevel;
  notes?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

enum PropertyType {
  SINGLE_FAMILY = "single_family",
  CONDOMINIUM = "condominium",
  TOWNHOUSE = "townhouse",
  MULTI_FAMILY = "multi_family",
}

enum PropertyCondition {
  NEW_CONSTRUCTION = "new_construction",
  EXCELLENT = "excellent",
  GOOD = "good",
  FAIR = "fair",
  POOR = "poor",
}

enum FinishLevel {
  LUXURY = "luxury",
  HIGH = "high",
  STANDARD = "standard",
  BASIC = "basic",
}
```

### Comparable Property

```typescript
interface ComparableProperty extends PropertyFeatures {
  address: string;
  salePrice: number;
  saleDate: string; // ISO 8601 date
  yearBuilt: number;
  propertyType?: PropertyType;
  condition?: PropertyCondition;
  latitude?: number;
  longitude?: number;
  daysSinceSale?: number; // For time adjustment
}
```

### Regression Configuration

```typescript
interface RegressionConfig {
  modelType: ModelType;
  includeTimeAdjustment: boolean;
  includeDistanceAdjustment?: boolean;
  minComps: number;
  maxComps: number;
  outlierThreshold?: number; // Standard deviations
  regularization?: number; // For ridge regression
}

enum ModelType {
  LINEAR = "linear",
  RIDGE = "ridge",
}
```

### Regression Coefficients

```typescript
interface RegressionCoefficients {
  intercept: number;
  gla: number; // Price per sqft
  beds: number;
  baths: number;
  lotSize: number; // Price per acre
  age: number; // Depreciation per year
  distance?: number; // Price per mile
  time?: number; // Price per day (market trend)
}

interface RegressionMetrics {
  rSquared: number;
  adjustedRSquared: number;
  standardError: number;
  pValues?: {
    [key: string]: number;
  };
}
```

### Adjustment Calculation

```typescript
interface PropertyAdjustments {
  gla: number;
  beds: number;
  baths: number;
  lotSize: number;
  age: number;
  distance?: number;
  time?: number;
  total: number;
}

interface ReportComp {
  original: ComparableProperty;
  distance: number;
  similarityScore: number; // 0-1, higher = more similar
  adjustments: PropertyAdjustments;
  adjustedPrice: number;
  residual: number; // Difference from predicted
  isOutlier?: boolean;
}
```

### Regression Result

```typescript
interface RegressionResult {
  modelType: string;
  coefficients: RegressionCoefficients;
  metrics: RegressionMetrics;
  adjustedPrices: number[];
  residuals: number[];
  confidenceGrade: ConfidenceGrade;
  confidenceScore: number;
  outliers: number[]; // Indices of outlier comps
}
```

### Valuation Result

```typescript
interface ValuationResult {
  estimatedValue: number;
  valueRange: {
    low: number; // 90% confidence lower bound
    high: number; // 90% confidence upper bound
  };
  confidenceGrade: ConfidenceGrade;
  confidenceScore: number; // 0-1
  methodology?: string;
}

enum ConfidenceGrade {
  A = "A", // 0.85-1.0
  B = "B", // 0.70-0.84
  C = "C", // 0.55-0.69
  D = "D", // < 0.55
}
```

### Report

```typescript
interface Report {
  reportId: string;
  subject: SubjectProperty;
  comps: ComparableProperty[];
  adjustedComps: ReportComp[];
  regression: RegressionResult;
  valuation: ValuationResult;
  outliers: number[]; // Indices of outlier comps
  charts: ChartData;
  metadata: ReportMetadata;
}

interface ChartData {
  priceVsGla: {
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
  };
  priceDistribution: {
    adjusted: number[];
    unadjusted: number[];
  };
  salePriceTrend: Array<{
    date: string;
    price: number;
    adjustedPrice: number;
  }>;
}

interface ReportMetadata {
  generatedAt: string; // ISO 8601 timestamp
  compCount: number;
  modelVersion: string;
  processingTimeMs?: number;
}
```

### CSV Import Format

```typescript
interface CSVRow {
  // Required fields (various column names supported)
  address?: string;
  "Property Address"?: string;
  salePrice?: number;
  "Sale Price"?: number;
  "Sold Price"?: number;
  saleDate?: string;
  "Sale Date"?: string;
  "Close Date"?: string;
  gla?: number;
  "Square Feet"?: number;
  "Living Area"?: number;
  beds?: number;
  Bedrooms?: number;
  Beds?: number;
  baths?: number;
  Bathrooms?: number;
  Baths?: number;
  yearBuilt?: number;
  "Year Built"?: number;
  lotSize?: number;
  "Lot Size"?: number;
  "Lot Acres"?: number;

  // Optional
  latitude?: number;
  longitude?: number;
  Lat?: number;
  Lng?: number;
}
```

### Parser Types

```typescript
// Parsed comparable property from CSV
// This is the normalized format after parsing various CSV formats
type ParsedComp = Omit<
  ComparableProperty,
  "age" | "distance" | "daysSinceSale"
> & {
  [key: string]: unknown; // Allow additional fields from CSV
};

interface ParseResult {
  success: boolean;
  comps: ParsedComp[];
  errors: string[];
  warnings: string[];
}
```

## Data Validation Rules

### Subject Property

- `beds`: 1-10
- `baths`: 0.5-10 (increment 0.5)
- `gla`: 100-20,000 sqft
- `lotSize`: 0.01-100 acres
- `yearBuilt`: 1800-current year
- `address`: Non-empty, valid format

### Comparable Property

- `salePrice`: $10,000-$50,000,000
- `saleDate`: Within last 5 years
- `gla`: 100-20,000 sqft
- `beds`: 1-10
- `baths`: 0.5-10
- `yearBuilt`: 1800-current year
- `lotSize`: 0.01-100 acres (if provided)

### Report Generation

- Minimum 3 comps required
- Maximum 15 comps (use most similar)
- All comps must have required fields
- Subject and comps should be same property type (warning if not)
- Sale dates within 12 months preferred

## Data Transformations

### Geocoding

- Address → coordinates (latitude, longitude)
- Coordinates → distance calculation (Haversine formula)

### Time Adjustments

- Sale date → days since sale
- Market trend coefficient → time adjustment

### Similarity Scoring

```typescript
function calculateSimilarity(
  subject: SubjectProperty,
  comp: ComparableProperty
): number {
  // Weighted factors:
  // - GLA difference: 30%
  // - Bed/bath match: 20%
  // - Age difference: 20%
  // - Distance: 15%
  // - Lot size: 10%
  // - Sale recency: 5%
  // Returns 0-1 score
}
```

## Database Schema (Prisma)

The database uses PostgreSQL with Prisma ORM. The schema is defined in `apps/api/prisma/schema.prisma`.

### User Model

```prisma
model User {
  id                String    @id @default(uuid())
  email             String    @unique
  auth0Id           String?   @unique // For Auth0 integration
  subscriptionTier  String    @default("free") // free | pro | enterprise
  reportsGenerated  Int       @default(0)
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  reports           Report[]
  
  @@index([email])
  @@index([auth0Id])
}
```

**TypeScript Interface:**

```typescript
interface User {
  id: string;
  email: string;
  auth0Id?: string;
  subscriptionTier: SubscriptionTier;
  reportsGenerated: number;
  createdAt: Date;
  updatedAt: Date;
}

enum SubscriptionTier {
  FREE = "free",
  PRO = "pro",
  ENTERPRISE = "enterprise",
}
```

### Report Model

```prisma
model Report {
  id          String   @id @default(uuid())
  userId      String?  // Nullable for MVP (stateless)
  name        String?  // User-provided name
  reportId    String   @unique // From Report.reportId (client-generated)
  reportData  Json     // Full Report JSON structure
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  user        User?    @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
  @@index([createdAt])
  @@index([reportId])
}
```

**TypeScript Interface:**

```typescript
interface SavedReport {
  id: string;
  userId?: string; // Nullable for MVP stateless mode
  name?: string;
  reportId: string;
  reportData: Report; // Full Report JSON structure
  createdAt: Date;
  updatedAt: Date;
}
```

### Future Models

- **Templates**: Report templates for customization
- **User Preferences**: User-specific settings and preferences
- **Analytics**: Usage tracking and model performance metrics

### Database Migration

The project uses **Prisma 7.2.0** with a new configuration format. Connection URLs are configured in `prisma.config.ts` instead of the schema file.

Prisma migrations are used to manage schema changes:

```bash
# Generate Prisma Client
pnpm --filter api db:generate

# Create and apply migration
pnpm --filter api db:migrate

# Deploy migrations (production)
pnpm --filter api db:migrate:deploy

# Open Prisma Studio (database GUI)
pnpm --filter api db:studio
```

**Prisma 7.2.0 Configuration:**

- **Schema**: `apps/api/prisma/schema.prisma` - Database models (no `url` in datasource)
- **Config**: `apps/api/prisma.config.ts` - Connection URL and migration settings
- **Client**: `apps/api/src/lib/prisma.ts` - Prisma Client instance with `PrismaPg` adapter

**Note**: During MVP phase, the database is optional (stateless mode). The schema is ready for post-MVP when user authentication and report persistence are enabled.

**Reference**: [Prisma 7 PostgreSQL Quickstart](https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/postgresql)
