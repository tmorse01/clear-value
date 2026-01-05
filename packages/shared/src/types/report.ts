/**
 * Report-related types shared across frontend and backend
 */

import type {
  SubjectProperty,
  ComparableProperty,
  RegressionResult,
  ValuationResult,
} from "./regression.js";

export interface PropertyAdjustments {
  gla: number;
  beds: number;
  baths: number;
  lotSize: number;
  age: number;
  distance?: number;
  time?: number;
  total: number;
}

export interface ReportComp {
  original: ComparableProperty;
  distance: number;
  similarityScore: number;
  adjustments: PropertyAdjustments;
  adjustedPrice: number;
  residual: number;
  isOutlier?: boolean;
}

export interface ChartData {
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

export interface ReportMetadata {
  generatedAt: string; // ISO 8601 timestamp
  compCount: number;
  modelVersion: string;
  processingTimeMs?: number;
}

export interface Report {
  reportId: string;
  subject: SubjectProperty;
  comps: ComparableProperty[];
  adjustedComps: ReportComp[];
  regression: RegressionResult;
  valuation: ValuationResult;
  outliers: number[];
  charts: ChartData;
  metadata: ReportMetadata;
}

// Re-export for convenience
export type {
  SubjectProperty,
  ComparableProperty,
  RegressionResult,
  ValuationResult,
};
