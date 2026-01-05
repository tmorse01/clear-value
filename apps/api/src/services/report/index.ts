// Report Generator Service
// Location: apps/api/src/services/report/

/**
 * Responsibilities:
 * - Assemble report data structure
 * - Generate charts data
 * - Format for PDF export
 */

import type {
  SubjectProperty,
  ComparableProperty,
  RegressionResult,
  ValuationResult,
  Report,
  ReportComp,
  PropertyAdjustments,
  RegressionConfig,
} from "@clearvalue/shared";
import { runRegression, calculateValuation, calculateSimilarityScores } from "../regression/index.js";
import { generateChartData } from "./chartDataGenerator.js";
import { generateReportId } from "./reportId.js";

/**
 * Calculate distance between two coordinates (Haversine formula)
 */
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Calculate adjustments for a comp compared to subject
 */
function calculateAdjustments(
  subject: SubjectProperty,
  comp: ComparableProperty,
  coefficients: RegressionResult["coefficients"]
): PropertyAdjustments {
  const glaAdj = (subject.gla - comp.gla) * coefficients.gla;
  const bedsAdj = (subject.beds - comp.beds) * coefficients.beds;
  const bathsAdj = (subject.baths - comp.baths) * coefficients.baths;
  const lotSizeAdj = (subject.lotSize - comp.lotSize) * coefficients.lotSize;
  const ageAdj = ((subject.age || 0) - (comp.age || 0)) * coefficients.age;
  const distanceAdj = comp.distance && coefficients.distance
    ? comp.distance * coefficients.distance
    : 0;
  const timeAdj = comp.daysSinceSale && coefficients.time
    ? comp.daysSinceSale * coefficients.time
    : 0;

  const total =
    glaAdj + bedsAdj + bathsAdj + lotSizeAdj + ageAdj + distanceAdj + timeAdj;

  return {
    gla: glaAdj,
    beds: bedsAdj,
    baths: bathsAdj,
    lotSize: lotSizeAdj,
    age: ageAdj,
    ...(comp.distance !== undefined && { distance: distanceAdj }),
    ...(comp.daysSinceSale !== undefined && { time: timeAdj }),
    total,
  };
}

/**
 * Calculate days since sale from sale date
 */
function calculateDaysSinceSale(saleDate: string): number {
  const sale = new Date(saleDate);
  const now = new Date();
  const diffTime = now.getTime() - sale.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Prepare comps with distance and days since sale
 */
function prepareComps(
  subject: SubjectProperty,
  comps: ComparableProperty[]
): ComparableProperty[] {
  return comps.map((comp) => {
    const prepared: ComparableProperty = { ...comp };

    // Calculate distance if coordinates available
    if (
      subject.coordinates &&
      comp.latitude !== undefined &&
      comp.longitude !== undefined
    ) {
      prepared.distance = calculateDistance(
        subject.coordinates.latitude,
        subject.coordinates.longitude,
        comp.latitude,
        comp.longitude
      );
    }

    // Calculate days since sale
    prepared.daysSinceSale = calculateDaysSinceSale(comp.saleDate);

    // Calculate age if yearBuilt available (required field)
    if (comp.yearBuilt) {
      const currentYear = new Date().getFullYear();
      prepared.age = Math.max(0, currentYear - comp.yearBuilt);
    } else {
      // Default to 0 if yearBuilt is missing (shouldn't happen after validation)
      prepared.age = 0;
    }

    return prepared;
  });
}

/**
 * Generate report structure from regression results
 * @param subject - Subject property
 * @param comps - Comparable properties
 * @param config - Regression configuration
 * @returns Complete report structure
 */
export async function generateReport(
  subject: SubjectProperty,
  comps: ComparableProperty[],
  config: RegressionConfig
): Promise<Report> {
  const startTime = Date.now();

  // Validate minimum comps
  if (comps.length < config.minComps) {
    throw new Error(
      `Insufficient comps: minimum ${config.minComps} required, received ${comps.length}`
    );
  }

  // Prepare comps with distance and time calculations
  const preparedComps = prepareComps(subject, comps);

  // Run regression
  const regressionResult = await runRegression(subject, preparedComps, config);

  // Calculate valuation
  const valuationResult = calculateValuation(subject, regressionResult);

  // Calculate similarity scores
  const similarityScores = calculateSimilarityScores(subject, preparedComps);

  // Build adjusted comps with adjustments
  const adjustedComps: ReportComp[] = preparedComps.map((comp, index) => {
    const adjustments = calculateAdjustments(
      subject,
      comp,
      regressionResult.coefficients
    );
    const adjustedPrice = comp.salePrice + adjustments.total;
    const residual = regressionResult.residuals[index] || 0;

    return {
      original: comp,
      distance: comp.distance || 0,
      similarityScore: similarityScores[index],
      adjustments,
      adjustedPrice,
      residual,
      isOutlier: regressionResult.outliers.includes(index),
    };
  });

  // Generate chart data
  const charts = generateChartData(
    subject,
    preparedComps,
    adjustedComps,
    regressionResult
  );

  // Generate report ID
  const reportId = generateReportId();

  const endTime = Date.now();

  return {
    reportId,
    subject,
    comps: preparedComps,
    adjustedComps,
    regression: regressionResult,
    valuation: valuationResult,
    outliers: regressionResult.outliers,
    charts,
    metadata: {
      generatedAt: new Date().toISOString(),
      compCount: preparedComps.length,
      modelVersion: "1.0",
      processingTimeMs: endTime - startTime,
    },
  };
}
