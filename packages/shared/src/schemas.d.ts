/**
 * Zod validation schemas shared across frontend and backend
 */
import { z } from "zod";
/**
 * CSV Row Schema - Flexible schema for raw CSV data
 * Supports various column name formats
 */
export declare const CSVRowSchema: z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodUnknown>, Record<string, unknown>, Record<string, unknown>>;
/**
 * Comparable Property Schema - Normalized output format
 */
export declare const ComparablePropertySchema: z.ZodObject<{
    address: z.ZodString;
    salePrice: z.ZodNumber;
    saleDate: z.ZodString;
    gla: z.ZodNumber;
    beds: z.ZodNumber;
    baths: z.ZodNumber;
    lotSize: z.ZodNumber;
    yearBuilt: z.ZodNumber;
    propertyType: z.ZodOptional<z.ZodNativeEnum<{
        readonly SINGLE_FAMILY: "single_family";
        readonly CONDOMINIUM: "condominium";
        readonly TOWNHOUSE: "townhouse";
        readonly MULTI_FAMILY: "multi_family";
    }>>;
    condition: z.ZodOptional<z.ZodNativeEnum<{
        readonly NEW_CONSTRUCTION: "new_construction";
        readonly EXCELLENT: "excellent";
        readonly GOOD: "good";
        readonly FAIR: "fair";
        readonly POOR: "poor";
    }>>;
    latitude: z.ZodOptional<z.ZodNumber>;
    longitude: z.ZodOptional<z.ZodNumber>;
    age: z.ZodOptional<z.ZodNumber>;
    distance: z.ZodOptional<z.ZodNumber>;
    daysSinceSale: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    address: string;
    salePrice: number;
    saleDate: string;
    gla: number;
    beds: number;
    baths: number;
    lotSize: number;
    yearBuilt: number;
    propertyType?: "single_family" | "condominium" | "townhouse" | "multi_family" | undefined;
    condition?: "new_construction" | "excellent" | "good" | "fair" | "poor" | undefined;
    latitude?: number | undefined;
    longitude?: number | undefined;
    age?: number | undefined;
    distance?: number | undefined;
    daysSinceSale?: number | undefined;
}, {
    address: string;
    salePrice: number;
    saleDate: string;
    gla: number;
    beds: number;
    baths: number;
    lotSize: number;
    yearBuilt: number;
    propertyType?: "single_family" | "condominium" | "townhouse" | "multi_family" | undefined;
    condition?: "new_construction" | "excellent" | "good" | "fair" | "poor" | undefined;
    latitude?: number | undefined;
    longitude?: number | undefined;
    age?: number | undefined;
    distance?: number | undefined;
    daysSinceSale?: number | undefined;
}>;
/**
 * Subject Property Input Schema - For validation endpoint
 */
export declare const SubjectPropertyInputSchema: z.ZodObject<{
    address: z.ZodString;
    beds: z.ZodNumber;
    baths: z.ZodEffects<z.ZodNumber, number, number>;
    gla: z.ZodNumber;
    lotSize: z.ZodNumber;
    yearBuilt: z.ZodNumber;
    propertyType: z.ZodOptional<z.ZodNativeEnum<{
        readonly SINGLE_FAMILY: "single_family";
        readonly CONDOMINIUM: "condominium";
        readonly TOWNHOUSE: "townhouse";
        readonly MULTI_FAMILY: "multi_family";
    }>>;
    condition: z.ZodOptional<z.ZodNativeEnum<{
        readonly NEW_CONSTRUCTION: "new_construction";
        readonly EXCELLENT: "excellent";
        readonly GOOD: "good";
        readonly FAIR: "fair";
        readonly POOR: "poor";
    }>>;
    finishLevel: z.ZodOptional<z.ZodNativeEnum<{
        readonly LUXURY: "luxury";
        readonly HIGH: "high";
        readonly STANDARD: "standard";
        readonly BASIC: "basic";
    }>>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    address: string;
    gla: number;
    beds: number;
    baths: number;
    lotSize: number;
    yearBuilt: number;
    propertyType?: "single_family" | "condominium" | "townhouse" | "multi_family" | undefined;
    condition?: "new_construction" | "excellent" | "good" | "fair" | "poor" | undefined;
    finishLevel?: "luxury" | "high" | "standard" | "basic" | undefined;
    notes?: string | undefined;
}, {
    address: string;
    gla: number;
    beds: number;
    baths: number;
    lotSize: number;
    yearBuilt: number;
    propertyType?: "single_family" | "condominium" | "townhouse" | "multi_family" | undefined;
    condition?: "new_construction" | "excellent" | "good" | "fair" | "poor" | undefined;
    finishLevel?: "luxury" | "high" | "standard" | "basic" | undefined;
    notes?: string | undefined;
}>;
/**
 * Subject Property Output Schema - Validated and normalized output
 */
export declare const SubjectPropertyOutputSchema: z.ZodObject<{
    valid: z.ZodBoolean;
    normalized: z.ZodObject<{
        address: z.ZodString;
        coordinates: z.ZodOptional<z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            latitude: number;
            longitude: number;
        }, {
            latitude: number;
            longitude: number;
        }>>;
        beds: z.ZodNumber;
        baths: z.ZodNumber;
        gla: z.ZodNumber;
        lotSize: z.ZodNumber;
        yearBuilt: z.ZodNumber;
        age: z.ZodNumber;
        propertyType: z.ZodOptional<z.ZodNativeEnum<{
            readonly SINGLE_FAMILY: "single_family";
            readonly CONDOMINIUM: "condominium";
            readonly TOWNHOUSE: "townhouse";
            readonly MULTI_FAMILY: "multi_family";
        }>>;
        condition: z.ZodOptional<z.ZodNativeEnum<{
            readonly NEW_CONSTRUCTION: "new_construction";
            readonly EXCELLENT: "excellent";
            readonly GOOD: "good";
            readonly FAIR: "fair";
            readonly POOR: "poor";
        }>>;
        finishLevel: z.ZodOptional<z.ZodNativeEnum<{
            readonly LUXURY: "luxury";
            readonly HIGH: "high";
            readonly STANDARD: "standard";
            readonly BASIC: "basic";
        }>>;
        notes: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        address: string;
        gla: number;
        beds: number;
        baths: number;
        lotSize: number;
        yearBuilt: number;
        age: number;
        propertyType?: "single_family" | "condominium" | "townhouse" | "multi_family" | undefined;
        condition?: "new_construction" | "excellent" | "good" | "fair" | "poor" | undefined;
        finishLevel?: "luxury" | "high" | "standard" | "basic" | undefined;
        notes?: string | undefined;
        coordinates?: {
            latitude: number;
            longitude: number;
        } | undefined;
    }, {
        address: string;
        gla: number;
        beds: number;
        baths: number;
        lotSize: number;
        yearBuilt: number;
        age: number;
        propertyType?: "single_family" | "condominium" | "townhouse" | "multi_family" | undefined;
        condition?: "new_construction" | "excellent" | "good" | "fair" | "poor" | undefined;
        finishLevel?: "luxury" | "high" | "standard" | "basic" | undefined;
        notes?: string | undefined;
        coordinates?: {
            latitude: number;
            longitude: number;
        } | undefined;
    }>;
    errors: z.ZodOptional<z.ZodArray<z.ZodObject<{
        field: z.ZodString;
        message: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        message: string;
        field: string;
    }, {
        message: string;
        field: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    valid: boolean;
    normalized: {
        address: string;
        gla: number;
        beds: number;
        baths: number;
        lotSize: number;
        yearBuilt: number;
        age: number;
        propertyType?: "single_family" | "condominium" | "townhouse" | "multi_family" | undefined;
        condition?: "new_construction" | "excellent" | "good" | "fair" | "poor" | undefined;
        finishLevel?: "luxury" | "high" | "standard" | "basic" | undefined;
        notes?: string | undefined;
        coordinates?: {
            latitude: number;
            longitude: number;
        } | undefined;
    };
    errors?: {
        message: string;
        field: string;
    }[] | undefined;
}, {
    valid: boolean;
    normalized: {
        address: string;
        gla: number;
        beds: number;
        baths: number;
        lotSize: number;
        yearBuilt: number;
        age: number;
        propertyType?: "single_family" | "condominium" | "townhouse" | "multi_family" | undefined;
        condition?: "new_construction" | "excellent" | "good" | "fair" | "poor" | undefined;
        finishLevel?: "luxury" | "high" | "standard" | "basic" | undefined;
        notes?: string | undefined;
        coordinates?: {
            latitude: number;
            longitude: number;
        } | undefined;
    };
    errors?: {
        message: string;
        field: string;
    }[] | undefined;
}>;
/**
 * Regression Config Schema
 */
export declare const RegressionConfigSchema: z.ZodObject<{
    modelType: z.ZodNativeEnum<{
        readonly LINEAR: "linear";
        readonly RIDGE: "ridge";
    }>;
    includeTimeAdjustment: z.ZodBoolean;
    includeDistanceAdjustment: z.ZodOptional<z.ZodBoolean>;
    minComps: z.ZodNumber;
    maxComps: z.ZodNumber;
    outlierThreshold: z.ZodOptional<z.ZodNumber>;
    regularization: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    modelType: "linear" | "ridge";
    includeTimeAdjustment: boolean;
    minComps: number;
    maxComps: number;
    includeDistanceAdjustment?: boolean | undefined;
    outlierThreshold?: number | undefined;
    regularization?: number | undefined;
}, {
    modelType: "linear" | "ridge";
    includeTimeAdjustment: boolean;
    minComps: number;
    maxComps: number;
    includeDistanceAdjustment?: boolean | undefined;
    outlierThreshold?: number | undefined;
    regularization?: number | undefined;
}>;
/**
 * Report Generation Request Schema
 */
export declare const ReportGenerateRequestSchema: z.ZodObject<{
    subject: z.ZodObject<{
        address: z.ZodString;
        beds: z.ZodNumber;
        baths: z.ZodEffects<z.ZodNumber, number, number>;
        gla: z.ZodNumber;
        lotSize: z.ZodNumber;
        yearBuilt: z.ZodNumber;
        propertyType: z.ZodOptional<z.ZodNativeEnum<{
            readonly SINGLE_FAMILY: "single_family";
            readonly CONDOMINIUM: "condominium";
            readonly TOWNHOUSE: "townhouse";
            readonly MULTI_FAMILY: "multi_family";
        }>>;
        condition: z.ZodOptional<z.ZodNativeEnum<{
            readonly NEW_CONSTRUCTION: "new_construction";
            readonly EXCELLENT: "excellent";
            readonly GOOD: "good";
            readonly FAIR: "fair";
            readonly POOR: "poor";
        }>>;
        finishLevel: z.ZodOptional<z.ZodNativeEnum<{
            readonly LUXURY: "luxury";
            readonly HIGH: "high";
            readonly STANDARD: "standard";
            readonly BASIC: "basic";
        }>>;
        notes: z.ZodOptional<z.ZodString>;
    } & {
        coordinates: z.ZodOptional<z.ZodObject<{
            latitude: z.ZodNumber;
            longitude: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            latitude: number;
            longitude: number;
        }, {
            latitude: number;
            longitude: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        address: string;
        gla: number;
        beds: number;
        baths: number;
        lotSize: number;
        yearBuilt: number;
        propertyType?: "single_family" | "condominium" | "townhouse" | "multi_family" | undefined;
        condition?: "new_construction" | "excellent" | "good" | "fair" | "poor" | undefined;
        finishLevel?: "luxury" | "high" | "standard" | "basic" | undefined;
        notes?: string | undefined;
        coordinates?: {
            latitude: number;
            longitude: number;
        } | undefined;
    }, {
        address: string;
        gla: number;
        beds: number;
        baths: number;
        lotSize: number;
        yearBuilt: number;
        propertyType?: "single_family" | "condominium" | "townhouse" | "multi_family" | undefined;
        condition?: "new_construction" | "excellent" | "good" | "fair" | "poor" | undefined;
        finishLevel?: "luxury" | "high" | "standard" | "basic" | undefined;
        notes?: string | undefined;
        coordinates?: {
            latitude: number;
            longitude: number;
        } | undefined;
    }>;
    comps: z.ZodArray<z.ZodObject<{
        address: z.ZodString;
        salePrice: z.ZodNumber;
        saleDate: z.ZodString;
        gla: z.ZodNumber;
        beds: z.ZodNumber;
        baths: z.ZodNumber;
        lotSize: z.ZodNumber;
        yearBuilt: z.ZodNumber;
        propertyType: z.ZodOptional<z.ZodNativeEnum<{
            readonly SINGLE_FAMILY: "single_family";
            readonly CONDOMINIUM: "condominium";
            readonly TOWNHOUSE: "townhouse";
            readonly MULTI_FAMILY: "multi_family";
        }>>;
        condition: z.ZodOptional<z.ZodNativeEnum<{
            readonly NEW_CONSTRUCTION: "new_construction";
            readonly EXCELLENT: "excellent";
            readonly GOOD: "good";
            readonly FAIR: "fair";
            readonly POOR: "poor";
        }>>;
        latitude: z.ZodOptional<z.ZodNumber>;
        longitude: z.ZodOptional<z.ZodNumber>;
        age: z.ZodOptional<z.ZodNumber>;
        distance: z.ZodOptional<z.ZodNumber>;
        daysSinceSale: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        address: string;
        salePrice: number;
        saleDate: string;
        gla: number;
        beds: number;
        baths: number;
        lotSize: number;
        yearBuilt: number;
        propertyType?: "single_family" | "condominium" | "townhouse" | "multi_family" | undefined;
        condition?: "new_construction" | "excellent" | "good" | "fair" | "poor" | undefined;
        latitude?: number | undefined;
        longitude?: number | undefined;
        age?: number | undefined;
        distance?: number | undefined;
        daysSinceSale?: number | undefined;
    }, {
        address: string;
        salePrice: number;
        saleDate: string;
        gla: number;
        beds: number;
        baths: number;
        lotSize: number;
        yearBuilt: number;
        propertyType?: "single_family" | "condominium" | "townhouse" | "multi_family" | undefined;
        condition?: "new_construction" | "excellent" | "good" | "fair" | "poor" | undefined;
        latitude?: number | undefined;
        longitude?: number | undefined;
        age?: number | undefined;
        distance?: number | undefined;
        daysSinceSale?: number | undefined;
    }>, "many">;
    config: z.ZodObject<{
        modelType: z.ZodNativeEnum<{
            readonly LINEAR: "linear";
            readonly RIDGE: "ridge";
        }>;
        includeTimeAdjustment: z.ZodBoolean;
        includeDistanceAdjustment: z.ZodOptional<z.ZodBoolean>;
        minComps: z.ZodNumber;
        maxComps: z.ZodNumber;
        outlierThreshold: z.ZodOptional<z.ZodNumber>;
        regularization: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        modelType: "linear" | "ridge";
        includeTimeAdjustment: boolean;
        minComps: number;
        maxComps: number;
        includeDistanceAdjustment?: boolean | undefined;
        outlierThreshold?: number | undefined;
        regularization?: number | undefined;
    }, {
        modelType: "linear" | "ridge";
        includeTimeAdjustment: boolean;
        minComps: number;
        maxComps: number;
        includeDistanceAdjustment?: boolean | undefined;
        outlierThreshold?: number | undefined;
        regularization?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    subject: {
        address: string;
        gla: number;
        beds: number;
        baths: number;
        lotSize: number;
        yearBuilt: number;
        propertyType?: "single_family" | "condominium" | "townhouse" | "multi_family" | undefined;
        condition?: "new_construction" | "excellent" | "good" | "fair" | "poor" | undefined;
        finishLevel?: "luxury" | "high" | "standard" | "basic" | undefined;
        notes?: string | undefined;
        coordinates?: {
            latitude: number;
            longitude: number;
        } | undefined;
    };
    comps: {
        address: string;
        salePrice: number;
        saleDate: string;
        gla: number;
        beds: number;
        baths: number;
        lotSize: number;
        yearBuilt: number;
        propertyType?: "single_family" | "condominium" | "townhouse" | "multi_family" | undefined;
        condition?: "new_construction" | "excellent" | "good" | "fair" | "poor" | undefined;
        latitude?: number | undefined;
        longitude?: number | undefined;
        age?: number | undefined;
        distance?: number | undefined;
        daysSinceSale?: number | undefined;
    }[];
    config: {
        modelType: "linear" | "ridge";
        includeTimeAdjustment: boolean;
        minComps: number;
        maxComps: number;
        includeDistanceAdjustment?: boolean | undefined;
        outlierThreshold?: number | undefined;
        regularization?: number | undefined;
    };
}, {
    subject: {
        address: string;
        gla: number;
        beds: number;
        baths: number;
        lotSize: number;
        yearBuilt: number;
        propertyType?: "single_family" | "condominium" | "townhouse" | "multi_family" | undefined;
        condition?: "new_construction" | "excellent" | "good" | "fair" | "poor" | undefined;
        finishLevel?: "luxury" | "high" | "standard" | "basic" | undefined;
        notes?: string | undefined;
        coordinates?: {
            latitude: number;
            longitude: number;
        } | undefined;
    };
    comps: {
        address: string;
        salePrice: number;
        saleDate: string;
        gla: number;
        beds: number;
        baths: number;
        lotSize: number;
        yearBuilt: number;
        propertyType?: "single_family" | "condominium" | "townhouse" | "multi_family" | undefined;
        condition?: "new_construction" | "excellent" | "good" | "fair" | "poor" | undefined;
        latitude?: number | undefined;
        longitude?: number | undefined;
        age?: number | undefined;
        distance?: number | undefined;
        daysSinceSale?: number | undefined;
    }[];
    config: {
        modelType: "linear" | "ridge";
        includeTimeAdjustment: boolean;
        minComps: number;
        maxComps: number;
        includeDistanceAdjustment?: boolean | undefined;
        outlierThreshold?: number | undefined;
        regularization?: number | undefined;
    };
}>;
export type CSVRow = z.infer<typeof CSVRowSchema>;
export type ComparablePropertyInput = z.infer<typeof ComparablePropertySchema>;
export type SubjectPropertyInput = z.infer<typeof SubjectPropertyInputSchema>;
export type SubjectPropertyOutput = z.infer<typeof SubjectPropertyOutputSchema>;
export type RegressionConfigInput = z.infer<typeof RegressionConfigSchema>;
export type ReportGenerateRequest = z.infer<typeof ReportGenerateRequestSchema>;
//# sourceMappingURL=schemas.d.ts.map