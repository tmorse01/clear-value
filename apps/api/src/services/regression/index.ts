// Regression Engine Service
// Location: apps/api/src/services/regression/

/**
 * Responsibilities:
 * - Accept comp data + subject property
 * - Run linear/ridge regression
 * - Calculate adjustments
 * - Detect outliers
 * - Generate confidence scores
 */

import type {
  SubjectProperty,
  ComparableProperty,
  RegressionConfig,
  RegressionResult,
  ValuationResult,
} from "@clearvalue/shared";
import { ConfidenceGrade } from "@clearvalue/shared";

/**
 * Calculate similarity score between subject and comp
 * Used for ranking and weighting comps
 */
function calculateSimilarityScore(
  subject: SubjectProperty,
  comp: ComparableProperty
): number {
  // Weighted factors for similarity
  let score = 0;
  const weights = {
    gla: 0.3,
    bedsBaths: 0.2,
    age: 0.2,
    distance: 0.15,
    lotSize: 0.1,
    recency: 0.05,
  };

  // GLA similarity (normalized difference)
  const glaDiff =
    Math.abs(subject.gla - comp.gla) / Math.max(subject.gla, comp.gla);
  score += (1 - Math.min(glaDiff, 1)) * weights.gla;

  // Bed/bath similarity
  const bedsMatch = subject.beds === comp.beds ? 1 : 0.5;
  const bathsMatch = Math.abs(subject.baths - comp.baths) < 0.5 ? 1 : 0.5;
  score += ((bedsMatch + bathsMatch) / 2) * weights.bedsBaths;

  // Age similarity
  const ageDiff =
    Math.abs(subject.age - (comp.age || 0)) /
    Math.max(subject.age, comp.age || 1, 1);
  score += (1 - Math.min(ageDiff, 1)) * weights.age;

  // Distance (if available)
  if (comp.distance !== undefined) {
    const distanceScore = Math.max(0, 1 - comp.distance / 5); // Normalize to 5 miles
    score += distanceScore * weights.distance;
  } else {
    score += 0.5 * weights.distance; // Neutral score if no distance
  }

  // Lot size similarity
  const lotDiff =
    Math.abs(subject.lotSize - comp.lotSize) /
    Math.max(subject.lotSize, comp.lotSize, 0.01);
  score += (1 - Math.min(lotDiff, 1)) * weights.lotSize;

  // Recency (days since sale)
  if (comp.daysSinceSale !== undefined) {
    const recencyScore = Math.max(0, 1 - comp.daysSinceSale / 365); // Normalize to 1 year
    score += recencyScore * weights.recency;
  } else {
    score += 0.5 * weights.recency;
  }

  return Math.max(0, Math.min(1, score));
}

/**
 * Run regression analysis on comparable properties
 * STUBBED: Returns placeholder values for now
 * @param subject - Subject property features
 * @param comps - Array of comparable properties
 * @param config - Regression configuration
 * @returns RegressionResult with coefficients and metrics
 */
export async function runRegression(
  subject: SubjectProperty,
  comps: ComparableProperty[],
  config: RegressionConfig
): Promise<RegressionResult> {
  if (comps.length < config.minComps) {
    throw new Error(
      `Insufficient comps: minimum ${config.minComps} required, received ${comps.length}`
    );
  }

  // Calculate average sale price for placeholder valuation
  const avgPrice =
    comps.reduce((sum, comp) => sum + comp.salePrice, 0) / comps.length;
  const pricePerSqft =
    avgPrice / (comps.reduce((sum, comp) => sum + comp.gla, 0) / comps.length);

  // Stubbed coefficients (placeholder values)
  const coefficients = {
    intercept: avgPrice * 0.2,
    gla: pricePerSqft,
    beds: avgPrice * 0.02,
    baths: avgPrice * 0.03,
    lotSize: avgPrice * 0.1,
    age: -(avgPrice * 0.001), // Depreciation
    ...(config.includeDistanceAdjustment && { distance: -(avgPrice * 0.0001) }),
    ...(config.includeTimeAdjustment && { time: avgPrice * 0.00001 }),
  };

  // Calculate adjusted prices and residuals (stubbed)
  const adjustedPrices = comps.map((comp) => {
    let adjusted = comp.salePrice;
    adjusted += (subject.gla - comp.gla) * coefficients.gla;
    adjusted += (subject.beds - comp.beds) * coefficients.beds;
    adjusted += (subject.baths - comp.baths) * coefficients.baths;
    adjusted += (subject.lotSize - comp.lotSize) * coefficients.lotSize;
    adjusted += ((subject.age || 0) - (comp.age || 0)) * coefficients.age;
    if (comp.distance !== undefined && coefficients.distance) {
      adjusted += comp.distance * coefficients.distance;
    }
    if (comp.daysSinceSale !== undefined && coefficients.time) {
      adjusted += comp.daysSinceSale * coefficients.time;
    }
    return adjusted;
  });

  const residuals = adjustedPrices.map((adj, i) => comps[i].salePrice - adj);
  const stdError = Math.sqrt(
    residuals.reduce((sum, r) => sum + r * r, 0) / residuals.length
  );

  // Stubbed metrics
  const rSquared = 0.75; // Placeholder
  const adjustedRSquared =
    rSquared - (1 - rSquared) * (6 / (comps.length - 6 - 1));

  // Calculate confidence score
  const compQuality =
    comps.reduce((sum, comp) => {
      return sum + calculateSimilarityScore(subject, comp);
    }, 0) / comps.length;
  const normalizedStdError = Math.min(1, stdError / avgPrice);
  const confidenceScore = Math.max(
    0,
    Math.min(
      1,
      rSquared * 0.5 + compQuality * 0.3 + (1 - normalizedStdError) * 0.2
    )
  );

  // Determine confidence grade
  let confidenceGrade: ConfidenceGrade;
  if (confidenceScore >= 0.85) {
    confidenceGrade = ConfidenceGrade.A;
  } else if (confidenceScore >= 0.7) {
    confidenceGrade = ConfidenceGrade.B;
  } else if (confidenceScore >= 0.55) {
    confidenceGrade = ConfidenceGrade.C;
  } else {
    confidenceGrade = ConfidenceGrade.D;
  }

  return {
    modelType: config.modelType,
    coefficients,
    metrics: {
      rSquared,
      adjustedRSquared: Math.max(0, adjustedRSquared),
      standardError: stdError,
    },
    adjustedPrices,
    residuals,
    confidenceGrade,
    confidenceScore,
    outliers: [],
  };
}

/**
 * Calculate property valuation from regression results
 * STUBBED: Returns placeholder values for now
 * @param subject - Subject property features
 * @param regressionResult - Regression analysis results
 * @returns ValuationResult with estimated value and range
 */
export function calculateValuation(
  subject: SubjectProperty,
  regressionResult: RegressionResult
): ValuationResult {
  const { coefficients } = regressionResult;

  // Calculate estimated value using regression coefficients
  let estimatedValue = coefficients.intercept;
  estimatedValue += subject.gla * coefficients.gla;
  estimatedValue += subject.beds * coefficients.beds;
  estimatedValue += subject.baths * coefficients.baths;
  estimatedValue += subject.lotSize * coefficients.lotSize;
  estimatedValue += (subject.age || 0) * coefficients.age;
  if (subject.distance !== undefined && coefficients.distance) {
    estimatedValue += subject.distance * coefficients.distance;
  }

  // Calculate value range (90% confidence interval)
  const margin = regressionResult.metrics.standardError * 1.645; // 90% CI
  const valueRange = {
    low: Math.max(0, estimatedValue - margin),
    high: estimatedValue + margin,
  };

  return {
    estimatedValue: Math.max(0, estimatedValue),
    valueRange,
    confidenceGrade: regressionResult.confidenceGrade,
    confidenceScore: regressionResult.confidenceScore,
    methodology: "Linear regression (stubbed)",
  };
}

/**
 * Detect outliers in comparable properties
 * STUBBED: Returns empty array for now
 * @param comps - Array of comparable properties
 * @param residuals - Residual values from regression
 * @returns Array of indices indicating outliers
 */
export function detectOutliers(
  comps: ComparableProperty[],
  residuals: number[]
): number[] {
  if (residuals.length === 0) return [];

  // Calculate mean and standard deviation of residuals
  const mean = residuals.reduce((sum, r) => sum + r, 0) / residuals.length;
  const variance =
    residuals.reduce((sum, r) => sum + (r - mean) ** 2, 0) / residuals.length;
  const stdDev = Math.sqrt(variance);

  // Mark outliers as those beyond 2 standard deviations
  const threshold = 2 * stdDev;
  const outliers: number[] = [];

  residuals.forEach((residual, index) => {
    if (Math.abs(residual - mean) > threshold) {
      outliers.push(index);
    }
  });

  return outliers;
}

/**
 * Calculate similarity scores for all comps
 */
export function calculateSimilarityScores(
  subject: SubjectProperty,
  comps: ComparableProperty[]
): number[] {
  return comps.map((comp) => calculateSimilarityScore(subject, comp));
}
