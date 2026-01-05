/**
 * Chart Data Generator Service
 * Generates chart data for report visualizations
 */

import type {
  ComparableProperty,
  SubjectProperty,
  RegressionResult,
  ChartData,
  ReportComp,
} from "@clearvalue/shared";

/**
 * Generate chart data for all chart types
 */
export function generateChartData(
  subject: SubjectProperty,
  comps: ComparableProperty[],
  adjustedComps: ReportComp[],
  regressionResult: RegressionResult
): ChartData {
  return {
    priceVsGla: generatePriceVsGlaChart(
      subject,
      comps,
      adjustedComps,
      regressionResult
    ),
    priceDistribution: generatePriceDistributionChart(comps, adjustedComps),
    salePriceTrend: generateSalePriceTrendChart(comps, adjustedComps),
  };
}

/**
 * Generate Price vs GLA scatter plot data with regression line
 */
function generatePriceVsGlaChart(
  subject: SubjectProperty,
  comps: ComparableProperty[],
  adjustedComps: ReportComp[],
  regressionResult: RegressionResult
): ChartData["priceVsGla"] {
  // Data points for comps
  const data = adjustedComps.map((comp) => ({
    gla: comp.original.gla,
    price: comp.original.salePrice,
    adjustedPrice: comp.adjustedPrice,
    isSubject: false,
  }));

  // Add subject property point
  if (regressionResult.coefficients) {
    const subjectPrice =
      regressionResult.coefficients.intercept +
      subject.gla * regressionResult.coefficients.gla +
      subject.beds * regressionResult.coefficients.beds +
      subject.baths * regressionResult.coefficients.baths +
      subject.lotSize * regressionResult.coefficients.lotSize +
      (subject.age || 0) * regressionResult.coefficients.age;

    data.push({
      gla: subject.gla,
      price: subjectPrice,
      adjustedPrice: subjectPrice,
      isSubject: true,
    });
  }

  // Generate regression line points
  const regressionLine: Array<{ gla: number; price: number }> = [];
  if (regressionResult.coefficients) {
    const { intercept, gla: glaCoeff } = regressionResult.coefficients;
    const minGla = Math.min(...comps.map((c) => c.gla), subject.gla);
    const maxGla = Math.max(...comps.map((c) => c.gla), subject.gla);

    // Generate 20 points along the regression line
    for (let i = 0; i <= 20; i++) {
      const gla = minGla + ((maxGla - minGla) * i) / 20;
      const price = intercept + gla * glaCoeff;
      regressionLine.push({ gla, price });
    }
  }

  return {
    data,
    regressionLine,
  };
}

/**
 * Generate price distribution data (adjusted vs unadjusted)
 */
function generatePriceDistributionChart(
  comps: ComparableProperty[],
  adjustedComps: ReportComp[]
): ChartData["priceDistribution"] {
  return {
    adjusted: adjustedComps.map((comp) => comp.adjustedPrice),
    unadjusted: comps.map((comp) => comp.salePrice),
  };
}

/**
 * Generate sale price trend over time
 */
function generateSalePriceTrendChart(
  comps: ComparableProperty[],
  adjustedComps: ReportComp[]
): ChartData["salePriceTrend"] {
  // Sort comps by sale date
  const sortedComps = [...comps].sort((a, b) => {
    const dateA = new Date(a.saleDate).getTime();
    const dateB = new Date(b.saleDate).getTime();
    return dateA - dateB;
  });

  // Create trend data points
  return sortedComps.map((comp, index) => {
    const adjustedComp = adjustedComps.find(
      (ac) => ac.original.address === comp.address
    );
    return {
      date: comp.saleDate,
      price: comp.salePrice,
      adjustedPrice: adjustedComp?.adjustedPrice || comp.salePrice,
    };
  });
}

