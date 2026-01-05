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

export enum PropertyType {
  SINGLE_FAMILY = "single_family",
  CONDOMINIUM = "condominium",
  TOWNHOUSE = "townhouse",
  MULTI_FAMILY = "multi_family",
}

export enum PropertyCondition {
  NEW_CONSTRUCTION = "new_construction",
  EXCELLENT = "excellent",
  GOOD = "good",
  FAIR = "fair",
  POOR = "poor",
}

export enum FinishLevel {
  LUXURY = "luxury",
  HIGH = "high",
  STANDARD = "standard",
  BASIC = "basic",
}
