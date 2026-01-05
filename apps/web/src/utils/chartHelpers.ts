import type { ReportComp } from "@clearvalue/shared";
import type { ComparableProperty, SubjectProperty } from "@clearvalue/shared";

/**
 * Transform report data for Price vs GLA chart
 */
export function transformPriceVsGlaData(
  comps: ComparableProperty[],
  adjustedComps: ReportComp[],
  subject?: SubjectProperty,
  regressionLine?: Array<{ gla: number; price: number }>
) {
  const data = comps.map((comp, index) => ({
    gla: comp.gla,
    price: comp.salePrice,
    adjustedPrice: adjustedComps[index]?.adjustedPrice,
    isSubject: false,
  }));

  if (subject) {
    data.push({
      gla: subject.gla,
      price: 0, // Subject doesn't have a sale price
      adjustedPrice: 0,
      isSubject: true,
    });
  }

  return {
    data,
    regressionLine: regressionLine || [],
  };
}

/**
 * Calculate regression line points for Price vs GLA
 */
export function calculateRegressionLine(
  minGla: number,
  maxGla: number,
  intercept: number,
  glaCoefficient: number,
  steps: number = 50
): Array<{ gla: number; price: number }> {
  const points: Array<{ gla: number; price: number }> = [];
  const step = (maxGla - minGla) / steps;

  for (let i = 0; i <= steps; i++) {
    const gla = minGla + step * i;
    const price = intercept + glaCoefficient * gla;
    points.push({ gla, price });
  }

  return points;
}

/**
 * Transform data for price distribution chart
 */
export function transformPriceDistributionData(
  comps: ComparableProperty[],
  adjustedComps: ReportComp[]
) {
  return {
    unadjusted: comps.map((comp) => comp.salePrice),
    adjusted: adjustedComps.map((comp) => comp.adjustedPrice),
  };
}

/**
 * Transform data for sale price trend chart
 */
export function transformSalePriceTrendData(
  comps: ComparableProperty[],
  adjustedComps: ReportComp[]
): Array<{ date: string; price: number; adjustedPrice: number }> {
  return comps.map((comp, index) => ({
    date: comp.saleDate,
    price: comp.salePrice,
    adjustedPrice: adjustedComps[index]?.adjustedPrice || comp.salePrice,
  })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

/**
 * Calculate chart domain for price axis
 */
export function calculatePriceDomain(
  prices: number[],
  paddingPercent: number = 0.1
): [number, number] {
  if (prices.length === 0) {
    return [0, 1000000];
  }

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min;
  const padding = range * paddingPercent;

  return [Math.max(0, min - padding), max + padding];
}

/**
 * Calculate chart domain for GLA axis
 */
export function calculateGlaDomain(
  glaValues: number[],
  paddingPercent: number = 0.05
): [number, number] {
  if (glaValues.length === 0) {
    return [0, 5000];
  }

  const min = Math.min(...glaValues);
  const max = Math.max(...glaValues);
  const range = max - min;
  const padding = range * paddingPercent;

  return [Math.max(0, min - padding), max + padding];
}

