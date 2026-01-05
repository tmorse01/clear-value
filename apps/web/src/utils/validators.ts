import type { SubjectPropertyInput } from "../services/api";

/**
 * Validate beds (1-10)
 */
export function validateBeds(beds: number): string | null {
  if (!Number.isInteger(beds) || beds < 1 || beds > 10) {
    return "Beds must be between 1 and 10";
  }
  return null;
}

/**
 * Validate baths (0.5-10, increment 0.5)
 */
export function validateBaths(baths: number): string | null {
  if (baths < 0.5 || baths > 10) {
    return "Baths must be between 0.5 and 10";
  }
  // Check if valid increment (0.5, 1.0, 1.5, etc.)
  const remainder = (baths * 2) % 1;
  if (remainder !== 0) {
    return "Baths must be in 0.5 increments";
  }
  return null;
}

/**
 * Validate GLA (100-20,000 sqft)
 */
export function validateGLA(gla: number): string | null {
  if (!Number.isInteger(gla) || gla < 100 || gla > 20000) {
    return "GLA must be between 100 and 20,000 sqft";
  }
  return null;
}

/**
 * Validate lot size (0.01-100 acres)
 */
export function validateLotSize(lotSize: number): string | null {
  if (lotSize < 0.01 || lotSize > 100) {
    return "Lot size must be between 0.01 and 100 acres";
  }
  return null;
}

/**
 * Validate year built (1800-current year)
 */
export function validateYearBuilt(yearBuilt: number): string | null {
  const currentYear = new Date().getFullYear();
  if (!Number.isInteger(yearBuilt) || yearBuilt < 1800 || yearBuilt > currentYear) {
    return `Year built must be between 1800 and ${currentYear}`;
  }
  return null;
}

/**
 * Validate address (non-empty)
 */
export function validateAddress(address: string): string | null {
  if (!address || address.trim().length === 0) {
    return "Address is required";
  }
  return null;
}

/**
 * Validate entire subject property input
 */
export function validateSubjectProperty(
  data: Partial<SubjectPropertyInput>
): Record<string, string> {
  const errors: Record<string, string> = {};

  if (data.address !== undefined) {
    const addressError = validateAddress(data.address);
    if (addressError) errors.address = addressError;
  }

  if (data.beds !== undefined) {
    const bedsError = validateBeds(data.beds);
    if (bedsError) errors.beds = bedsError;
  }

  if (data.baths !== undefined) {
    const bathsError = validateBaths(data.baths);
    if (bathsError) errors.baths = bathsError;
  }

  if (data.gla !== undefined) {
    const glaError = validateGLA(data.gla);
    if (glaError) errors.gla = glaError;
  }

  if (data.lotSize !== undefined) {
    const lotSizeError = validateLotSize(data.lotSize);
    if (lotSizeError) errors.lotSize = lotSizeError;
  }

  if (data.yearBuilt !== undefined) {
    const yearBuiltError = validateYearBuilt(data.yearBuilt);
    if (yearBuiltError) errors.yearBuilt = yearBuiltError;
  }

  return errors;
}

/**
 * Validate CSV file
 */
export function validateCSVFile(file: File): string | null {
  // Check file type
  if (!file.name.endsWith(".csv") && file.type !== "text/csv") {
    return "File must be a CSV file";
  }

  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return "File size must be less than 10MB";
  }

  return null;
}

