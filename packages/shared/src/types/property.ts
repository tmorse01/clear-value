/**
 * Property-related types shared across frontend and backend
 */

export interface PropertyFeatures {
  gla: number; // Gross Living Area (sqft)
  beds: number;
  baths: number;
  lotSize: number; // Acres
  age: number; // Calculated from yearBuilt
  distance?: number; // Distance from subject (miles)
  [key: string]: unknown;
}

export interface SubjectProperty extends PropertyFeatures {
  address: string;
  yearBuilt: number;
  propertyType?: PropertyType;
  condition?: PropertyCondition;
  finishLevel?: FinishLevel;
  notes?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface ComparableProperty extends PropertyFeatures {
  address: string;
  salePrice: number;
  saleDate: string; // ISO 8601 date
  yearBuilt: number;
  propertyType?: PropertyType;
  condition?: PropertyCondition;
  latitude?: number;
  longitude?: number;
  daysSinceSale?: number; // For time adjustment
}

export const PropertyType = {
  SINGLE_FAMILY: "single_family",
  CONDOMINIUM: "condominium",
  TOWNHOUSE: "townhouse",
  MULTI_FAMILY: "multi_family",
} as const;

export type PropertyType = (typeof PropertyType)[keyof typeof PropertyType];

export const PropertyCondition = {
  NEW_CONSTRUCTION: "new_construction",
  EXCELLENT: "excellent",
  GOOD: "good",
  FAIR: "fair",
  POOR: "poor",
} as const;

export type PropertyCondition = (typeof PropertyCondition)[keyof typeof PropertyCondition];

export const FinishLevel = {
  LUXURY: "luxury",
  HIGH: "high",
  STANDARD: "standard",
  BASIC: "basic",
} as const;

export type FinishLevel = (typeof FinishLevel)[keyof typeof FinishLevel];
