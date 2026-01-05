/**
 * Zod validation schemas shared across frontend and backend
 */

import { z } from "zod";
import {
  PropertyType,
  PropertyCondition,
  FinishLevel,
} from "./types/property.js";
import { ModelType } from "./types/regression.js";

/**
 * CSV Row Schema - Flexible schema for raw CSV data
 * Supports various column name formats
 */
export const CSVRowSchema = z.record(z.string(), z.unknown()).refine(
  (data) => {
    // Check if at least one address field exists
    const addressFields = [
      "address",
      "Address",
      "Property Address",
      "property_address",
    ];
    return addressFields.some((field) => data[field] != null);
  },
  { message: "Missing required field: address" }
);

/**
 * Comparable Property Schema - Normalized output format
 */
export const ComparablePropertySchema = z.object({
  address: z.string().min(1),
  salePrice: z.number().positive(),
  saleDate: z.string(), // ISO 8601 date
  gla: z.number().positive(),
  beds: z.number().int().positive(),
  baths: z.number().positive(),
  lotSize: z.number().nonnegative(),
  yearBuilt: z.number().int().min(1800).max(new Date().getFullYear()),
  propertyType: z.nativeEnum(PropertyType).optional(),
  condition: z.nativeEnum(PropertyCondition).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  age: z.number().optional(),
  distance: z.number().optional(),
  daysSinceSale: z.number().optional(),
});

/**
 * Subject Property Input Schema - For validation endpoint
 */
export const SubjectPropertyInputSchema = z.object({
  address: z.string().min(1, "Address is required"),
  beds: z
    .number()
    .int()
    .min(1, "Beds must be between 1 and 10")
    .max(10, "Beds must be between 1 and 10"),
  baths: z
    .number()
    .min(0.5, "Baths must be between 0.5 and 10")
    .max(10, "Baths must be between 0.5 and 10")
    .refine(
      (val) => val % 0.5 === 0,
      "Baths must be in 0.5 increments"
    ),
  gla: z
    .number()
    .int()
    .min(100, "GLA must be between 100 and 20,000 sqft")
    .max(20000, "GLA must be between 100 and 20,000 sqft"),
  lotSize: z
    .number()
    .min(0.01, "Lot size must be between 0.01 and 100 acres")
    .max(100, "Lot size must be between 0.01 and 100 acres"),
  yearBuilt: z
    .number()
    .int()
    .min(1800, "Year built must be between 1800 and current year")
    .max(new Date().getFullYear(), "Year built must be between 1800 and current year"),
  propertyType: z.nativeEnum(PropertyType).optional(),
  condition: z.nativeEnum(PropertyCondition).optional(),
  finishLevel: z.nativeEnum(FinishLevel).optional(),
  notes: z.string().optional(),
});

/**
 * Subject Property Output Schema - Validated and normalized output
 */
export const SubjectPropertyOutputSchema = z.object({
  valid: z.boolean(),
  normalized: z.object({
    address: z.string(),
    coordinates: z
      .object({
        latitude: z.number(),
        longitude: z.number(),
      })
      .optional(),
    beds: z.number(),
    baths: z.number(),
    gla: z.number(),
    lotSize: z.number(),
    yearBuilt: z.number(),
    age: z.number(),
    propertyType: z.nativeEnum(PropertyType).optional(),
    condition: z.nativeEnum(PropertyCondition).optional(),
    finishLevel: z.nativeEnum(FinishLevel).optional(),
    notes: z.string().optional(),
  }),
  errors: z
    .array(
      z.object({
        field: z.string(),
        message: z.string(),
      })
    )
    .optional(),
});

/**
 * Regression Config Schema
 */
export const RegressionConfigSchema = z.object({
  modelType: z.nativeEnum(ModelType),
  includeTimeAdjustment: z.boolean(),
  includeDistanceAdjustment: z.boolean().optional(),
  minComps: z.number().int().positive(),
  maxComps: z.number().int().positive(),
  outlierThreshold: z.number().positive().optional(),
  regularization: z.number().nonnegative().optional(),
});

/**
 * Report Generation Request Schema
 */
export const ReportGenerateRequestSchema = z.object({
  subject: SubjectPropertyInputSchema.extend({
    // Subject for report generation can have coordinates pre-filled
    coordinates: z
      .object({
        latitude: z.number(),
        longitude: z.number(),
      })
      .optional(),
  }),
  comps: z.array(ComparablePropertySchema).min(3, "Minimum 3 comps required"),
  config: RegressionConfigSchema,
});

// Type exports
export type CSVRow = z.infer<typeof CSVRowSchema>;
export type ComparablePropertyInput = z.infer<typeof ComparablePropertySchema>;
export type SubjectPropertyInput = z.infer<typeof SubjectPropertyInputSchema>;
export type SubjectPropertyOutput = z.infer<typeof SubjectPropertyOutputSchema>;
export type RegressionConfigInput = z.infer<typeof RegressionConfigSchema>;
export type ReportGenerateRequest = z.infer<typeof ReportGenerateRequestSchema>;

