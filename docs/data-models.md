# Data Models

## TypeScript Interfaces

### Subject Property

```typescript
interface SubjectProperty {
  // Required
  address: string;
  beds: number;
  baths: number;
  gla: number; // Gross Living Area (sqft)
  lotSize: number; // Acres
  yearBuilt: number;
  propertyType: PropertyType;

  // Optional
  condition?: PropertyCondition;
  finishLevel?: FinishLevel;
  notes?: string;

  // Calculated (after geocoding)
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  age?: number; // Calculated from yearBuilt
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
interface ComparableProperty {
  // Required
  address: string;
  salePrice: number;
  saleDate: string; // ISO 8601 date
  gla: number;
  beds: number;
  baths: number;
  yearBuilt: number;

  // Optional
  lotSize?: number;
  propertyType?: PropertyType;
  condition?: PropertyCondition;

  // Calculated
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  distance?: number; // Miles from subject
  age?: number;
  daysSinceSale?: number; // For time adjustment
}
```

### Regression Configuration

```typescript
interface RegressionConfig {
  modelType: ModelType;
  includeTimeAdjustment: boolean;
  includeDistanceAdjustment: boolean;
  minComps: number; // Default: 3
  maxComps: number; // Default: 15
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

interface AdjustedComparable {
  original: ComparableProperty;
  adjustments: PropertyAdjustments;
  adjustedPrice: number;
  residual: number; // Difference from predicted
  similarityScore: number; // 0-1, higher = more similar
  isOutlier?: boolean;
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
  methodology: string;
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
  adjustedComps: AdjustedComparable[];
  regression: {
    coefficients: RegressionCoefficients;
    metrics: RegressionMetrics;
    config: RegressionConfig;
  };
  valuation: ValuationResult;
  outliers: string[]; // Comp addresses marked as outliers
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
  processingTimeMs: number;
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

## Storage (Future)

### User

```typescript
interface User {
  id: string;
  email: string;
  subscriptionTier: SubscriptionTier;
  reportsGenerated: number;
  createdAt: string;
}

enum SubscriptionTier {
  FREE = "free",
  PRO = "pro",
  ENTERPRISE = "enterprise",
}
```

### Saved Report

```typescript
interface SavedReport {
  id: string;
  userId: string;
  report: Report;
  name: string;
  createdAt: string;
  updatedAt: string;
}
```
