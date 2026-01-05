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
    outlierThreshold?: number;
    regularization?: number;
}
export declare const ModelType: {
    readonly LINEAR: "linear";
    readonly RIDGE: "ridge";
};
export type ModelType = (typeof ModelType)[keyof typeof ModelType];
export interface RegressionCoefficients {
    intercept: number;
    gla: number;
    beds: number;
    baths: number;
    lotSize: number;
    age: number;
    distance?: number;
    time?: number;
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
    outliers: number[];
}
export interface ValuationResult {
    estimatedValue: number;
    valueRange: {
        low: number;
        high: number;
    };
    confidenceGrade: ConfidenceGrade;
    confidenceScore: number;
    methodology?: string;
}
export declare const ConfidenceGrade: {
    readonly A: "A";
    readonly B: "B";
    readonly C: "C";
    readonly D: "D";
};
export type ConfidenceGrade = (typeof ConfidenceGrade)[keyof typeof ConfidenceGrade];
export type { SubjectProperty, ComparableProperty };
//# sourceMappingURL=regression.d.ts.map