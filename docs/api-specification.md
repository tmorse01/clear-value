# API Specification

## Base URL

```
Development: http://localhost:3000/api
Production: https://api.compclear.com/api
```

## Authentication

MVP: None (stateless)
Future: JWT tokens

## Endpoints

### Health Check

```
GET /health
```

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

---

### Parse CSV

```
POST /api/v1/parser/csv
Content-Type: multipart/form-data
```

**Request:**

- `file`: CSV file (MLS/Cloud CMA/RPR export)

**Response:**

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

**Error Response:**

```json
{
  "success": false,
  "error": "Invalid CSV format",
  "details": "Missing required field: salePrice"
}
```

---

### Validate Subject Property

```
POST /api/v1/subject/validate
Content-Type: application/json
```

**Request:**

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

**Response:**

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

---

### Generate Report

```
POST /api/v1/report/generate
Content-Type: application/json
```

**Request:**

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

**Response:**

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
      "intercept": 50000,
      "gla": 150,
      "beds": 5000,
      "baths": 8000,
      "lotSize": 20000,
      "age": -500,
      "distance": -100
    },
    "rSquared": 0.85,
    "adjustedRSquared": 0.82,
    "standardError": 25000
  },
  "comps": [
    {
      "original": {
        /* comp data */
      },
      "distance": 0.5,
      "similarityScore": 0.92,
      "adjustments": {
        "gla": 45000,
        "beds": 5000,
        "baths": 4000,
        "lotSize": 1000,
        "age": -6500,
        "distance": -50,
        "time": 5000
      },
      "adjustedPrice": 500000,
      "residual": 15000
    }
  ],
  "outliers": [],
  "charts": {
    "priceVsGla": {
      "data": [
        /* chart data points */
      ],
      "regressionLine": [
        /* line points */
      ]
    },
    "priceDistribution": {
      "adjusted": [
        /* values */
      ],
      "unadjusted": [
        /* values */
      ]
    },
    "salePriceTrend": {
      "data": [
        /* time series */
      ]
    }
  },
  "metadata": {
    "generatedAt": "2024-01-20T10:30:00Z",
    "compCount": 8,
    "modelVersion": "1.0"
  }
}
```

**Error Response:**

```json
{
  "error": "Insufficient comps",
  "message": "Minimum 3 comps required, received 2",
  "code": "INSUFFICIENT_COMPS"
}
```

---

### Export PDF

```
POST /api/v1/report/export-pdf
Content-Type: application/json
```

**Request:**

```json
{
  "reportId": "report_abc123"
}
```

**Response:**

- Content-Type: `application/pdf`
- Content-Disposition: `attachment; filename="compclear-report-abc123.pdf"`
- Binary PDF data

**Alternative (if report not cached):**

```json
{
  "error": "Report not found",
  "code": "REPORT_NOT_FOUND"
}
```

---

### Get Report Status

```
GET /api/v1/report/:reportId/status
```

**Response:**

```json
{
  "reportId": "report_abc123",
  "status": "completed",
  "progress": 100,
  "estimatedValue": 485000,
  "generatedAt": "2024-01-20T10:30:00Z"
}
```

---

## Error Codes

| Code                    | Description                     |
| ----------------------- | ------------------------------- |
| `INVALID_CSV`           | CSV file format is invalid      |
| `MISSING_FIELD`         | Required field missing in input |
| `INSUFFICIENT_COMPS`    | Not enough comps for regression |
| `REGRESSION_FAILED`     | Regression calculation failed   |
| `PDF_GENERATION_FAILED` | PDF export failed               |
| `REPORT_NOT_FOUND`      | Report ID not found             |
| `VALIDATION_ERROR`      | Input validation failed         |
| `RATE_LIMIT_EXCEEDED`   | Too many requests               |

## Rate Limiting

MVP: None
Future:

- Free tier: 5 reports/hour
- Paid tier: 50 reports/hour

## Response Times

- CSV parsing: < 1s
- Report generation: < 3s
- PDF export: < 5s
