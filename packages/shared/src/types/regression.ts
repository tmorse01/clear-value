/**
 * Regression-related types shared across frontend and backend
 */

import type { SubjectProperty, ComparableProperty } from "./property.js";

export interface RegressionConfig {
  modelType: ModelType;
  includeTimeAdjustment: boolean;
  includeDistanceAdjustment?: boolean;
  minComps: number;
  maxComps: number;
  outlierThreshold?: number; // Standard deviations
  regularization?: number; // For ridge regression
}

export const ModelType = {
  LINEAR: "linear",
  RIDGE: "ridge",
} as const;

export type ModelType = (typeof ModelType)[keyof typeof ModelType];

export interface RegressionCoefficients {
  intercept: number;
  gla: number; // Price per sqft
  beds: number;
  baths: number;
  lotSize: number; // Price per acre
  age: number; // Depreciation per year
  distance?: number; // Price per mile
  time?: number; // Price per day (market trend)
}

export interface RegressionMetrics {
  rSquared: number;
  adjustedRSquared: number;
  standardError: number;
  pValues?: {
    [key: string]: number;
  };
}

export interface RegressionResult {
  modelType: string;
  coefficients: RegressionCoefficients;
  metrics: RegressionMetrics;
  adjustedPrices: number[];
  residuals: number[];
  confidenceGrade: ConfidenceGrade;
  confidenceScore: number;
  outliers: number[]; // Indices of outlier comps
}

export interface ValuationResult {
  estimatedValue: number;
  valueRange: {
    low: number; // 90% confidence lower bound
    high: number; // 90% confidence upper bound
  };
  confidenceGrade: ConfidenceGrade;
  confidenceScore: number; // 0-1
  methodology?: string;
}

export const ConfidenceGrade = {
  A: "A", // 0.85-1.0
  B: "B", // 0.70-0.84
  C: "C", // 0.55-0.69
  D: "D", // < 0.55
} as const;

export type ConfidenceGrade = (typeof ConfidenceGrade)[keyof typeof ConfidenceGrade];

// Re-export for convenience
export type { SubjectProperty, ComparableProperty };
