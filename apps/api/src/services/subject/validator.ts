/**
 * Subject Property Validator Service
 * Validates subject property data and normalizes values
 */

import type { SubjectProperty } from "@clearvalue/shared";
import {
  PropertyType,
  PropertyCondition,
  FinishLevel,
} from "@clearvalue/shared";
import { SubjectPropertyInputSchema } from "@clearvalue/shared";

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  normalized?: SubjectProperty;
  errors: ValidationError[];
}

/**
 * Calculate age from year built
 */
function calculateAge(yearBuilt: number): number {
  const currentYear = new Date().getFullYear();
  return Math.max(0, currentYear - yearBuilt);
}

/**
 * Normalize property type enum value
 */
function normalizePropertyType(
  value: string | undefined
): PropertyType | undefined {
  if (!value) return undefined;

  const normalized = value.toLowerCase().trim();
  const mapping: Record<string, PropertyType> = {
    single_family: PropertyType.SINGLE_FAMILY,
    "single family": PropertyType.SINGLE_FAMILY,
    sf: PropertyType.SINGLE_FAMILY,
    condominium: PropertyType.CONDOMINIUM,
    condo: PropertyType.CONDOMINIUM,
    townhouse: PropertyType.TOWNHOUSE,
    "town house": PropertyType.TOWNHOUSE,
    multi_family: PropertyType.MULTI_FAMILY,
    "multi family": PropertyType.MULTI_FAMILY,
    duplex: PropertyType.MULTI_FAMILY,
  };

  return mapping[normalized] || undefined;
}

/**
 * Normalize property condition enum value
 */
function normalizeCondition(
  value: string | undefined
): PropertyCondition | undefined {
  if (!value) return undefined;

  const normalized = value.toLowerCase().trim();
  const mapping: Record<string, PropertyCondition> = {
    new_construction: PropertyCondition.NEW_CONSTRUCTION,
    "new construction": PropertyCondition.NEW_CONSTRUCTION,
    new: PropertyCondition.NEW_CONSTRUCTION,
    excellent: PropertyCondition.EXCELLENT,
    good: PropertyCondition.GOOD,
    fair: PropertyCondition.FAIR,
    poor: PropertyCondition.POOR,
  };

  return mapping[normalized] || undefined;
}

/**
 * Normalize finish level enum value
 */
function normalizeFinishLevel(value: string | undefined): FinishLevel | undefined {
  if (!value) return undefined;

  const normalized = value.toLowerCase().trim();
  const mapping: Record<string, FinishLevel> = {
    luxury: FinishLevel.LUXURY,
    high: FinishLevel.HIGH,
    standard: FinishLevel.STANDARD,
    basic: FinishLevel.BASIC,
  };

  return mapping[normalized] || undefined;
}

/**
 * Validate and normalize subject property data
 */
export function validateSubjectProperty(
  input: unknown
): ValidationResult {
  const errors: ValidationError[] = [];

  // Validate with Zod schema
  const validationResult = SubjectPropertyInputSchema.safeParse(input);

  if (!validationResult.success) {
    // Convert Zod errors to our format
    validationResult.error.issues.forEach((issue) => {
      const field = issue.path.join(".");
      errors.push({
        field: field || "unknown",
        message: issue.message,
      });
    });

    return {
      valid: false,
      errors,
    };
  }

  const data = validationResult.data;

  // Additional business rule validations
  // (Zod already handles most of these, but we can add custom checks here)

  // Normalize enum values
  const normalized: SubjectProperty = {
    address: data.address,
    beds: data.beds,
    baths: data.baths,
    gla: data.gla,
    lotSize: data.lotSize,
    yearBuilt: data.yearBuilt,
    age: calculateAge(data.yearBuilt),
    propertyType: normalizePropertyType(data.propertyType),
    condition: normalizeCondition(data.condition),
    finishLevel: normalizeFinishLevel(data.finishLevel),
    notes: data.notes,
  };

  return {
    valid: true,
    normalized,
    errors: [],
  };
}

