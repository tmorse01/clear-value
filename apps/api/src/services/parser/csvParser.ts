/**
 * CSV Parser Service
 * Handles parsing of MLS/Cloud CMA/RPR CSV exports with flexible column mapping
 */

import { createRequire } from "module";
import type * as PapaNamespace from "papaparse";
import type { ParsedComp, ParseResult } from "@clearvalue/shared";
import { ComparablePropertySchema, PropertyType } from "@clearvalue/shared";

// Use createRequire for CommonJS module interop
const require = createRequire(import.meta.url);
const Papa = require("papaparse") as typeof PapaNamespace;

/**
 * Column name mappings for flexible CSV format support
 */
const COLUMN_MAPPINGS = {
  address: [
    "address",
    "Address",
    "Property Address",
    "property_address",
    "Property_Address",
    "ADDRESS",
  ],
  salePrice: [
    "saleprice",
    "Sale Price",
    "Sale_Price",
    "salePrice",
    "Sold Price",
    "Sold_Price",
    "soldPrice",
    "SALE_PRICE",
    "Price",
    "price",
  ],
  saleDate: [
    "saledate",
    "Sale Date",
    "Sale_Date",
    "saleDate",
    "Close Date",
    "Close_Date",
    "closeDate",
    "SALE_DATE",
    "Sold Date",
    "Sold_Date",
  ],
  gla: [
    "gla",
    "GLA",
    "Square Feet",
    "Square_Feet",
    "squareFeet",
    "Living Area",
    "Living_Area",
    "livingArea",
    "SqFt",
    "sqft",
    "SQFT",
  ],
  beds: ["beds", "Beds", "BEDS", "Bedrooms", "bedrooms", "BEDROOMS", "Bed"],
  baths: [
    "baths",
    "Baths",
    "BATHS",
    "Bathrooms",
    "bathrooms",
    "BATHROOMS",
    "Bath",
  ],
  yearBuilt: [
    "yearbuilt",
    "Year Built",
    "Year_Built",
    "yearBuilt",
    "YEAR_BUILT",
    "Year",
    "year",
  ],
  lotSize: [
    "lotsize",
    "Lot Size",
    "Lot_Size",
    "lotSize",
    "LOT_SIZE",
    "Lot Size (Acres)",
    "Lot Size (acres)",
    "Lot_Size_(Acres)",
    "Lot Acres",
    "Lot_Acres",
    "lotAcres",
    "Acres",
    "acres",
  ],
  latitude: ["latitude", "Latitude", "LATITUDE", "Lat", "lat", "LAT"],
  longitude: [
    "longitude",
    "Longitude",
    "LONGITUDE",
    "Lng",
    "lng",
    "LNG",
    "Lon",
    "lon",
  ],
  propertyType: [
    "propertytype",
    "Property Type",
    "Property_Type",
    "propertyType",
    "Type",
    "type",
  ],
  condition: ["condition", "Condition", "CONDITION", "Cond", "cond"],
} as const;

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
 * Find the column name in CSV row that matches any of the possible names
 */
function findColumn(
  row: Record<string, unknown>,
  possibleNames: readonly string[]
): string | null {
  const rowKeys = Object.keys(row).map((k) => k.toLowerCase().trim());
  for (const name of possibleNames) {
    const normalizedName = name.toLowerCase().trim();
    const foundKey = rowKeys.find((key) => key === normalizedName);
    if (foundKey) {
      return (
        Object.keys(row).find((k) => k.toLowerCase().trim() === foundKey) ||
        null
      );
    }
  }
  return null;
}

/**
 * Extract value from CSV row using column mappings
 */
function extractValue(
  row: Record<string, unknown>,
  field: keyof typeof COLUMN_MAPPINGS
): unknown {
  const columnName = findColumn(row, COLUMN_MAPPINGS[field]);
  if (!columnName) {
    return undefined;
  }
  return row[columnName];
}

/**
 * Normalize a value to the expected type
 */
function normalizeValue(
  value: unknown,
  field: string,
  type: "number" | "string" | "date"
): unknown {
  if (value === null || value === undefined || value === "") {
    return undefined;
  }

  if (type === "number") {
    if (typeof value === "number") {
      return value;
    }
    if (typeof value === "string") {
      // Remove currency symbols, commas, etc.
      const cleaned = value.replace(/[$,]/g, "").trim();
      const num = parseFloat(cleaned);
      return isNaN(num) ? undefined : num;
    }
    return undefined;
  }

  if (type === "date") {
    if (typeof value === "string") {
      // Try to parse various date formats
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return date.toISOString().split("T")[0]; // Return YYYY-MM-DD format
      }
    }
    return undefined;
  }

  if (type === "string") {
    return String(value).trim();
  }

  return value;
}

/**
 * Parse a single CSV row into a normalized comparable property
 */
function parseRow(
  row: Record<string, unknown>,
  rowIndex: number
): { comp: ParsedComp | null; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Extract and normalize values
  const address = normalizeValue(
    extractValue(row, "address"),
    "address",
    "string"
  ) as string | undefined;

  const salePrice = normalizeValue(
    extractValue(row, "salePrice"),
    "salePrice",
    "number"
  ) as number | undefined;

  const saleDate = normalizeValue(
    extractValue(row, "saleDate"),
    "saleDate",
    "date"
  ) as string | undefined;

  const gla = normalizeValue(extractValue(row, "gla"), "gla", "number") as
    | number
    | undefined;

  const beds = normalizeValue(extractValue(row, "beds"), "beds", "number") as
    | number
    | undefined;

  const baths = normalizeValue(
    extractValue(row, "baths"),
    "baths",
    "number"
  ) as number | undefined;

  const yearBuilt = normalizeValue(
    extractValue(row, "yearBuilt"),
    "yearBuilt",
    "number"
  ) as number | undefined;

  const lotSize = normalizeValue(
    extractValue(row, "lotSize"),
    "lotSize",
    "number"
  ) as number | undefined;

  const latitude = normalizeValue(
    extractValue(row, "latitude"),
    "latitude",
    "number"
  ) as number | undefined;

  const longitude = normalizeValue(
    extractValue(row, "longitude"),
    "longitude",
    "number"
  ) as number | undefined;

  const propertyType = extractValue(row, "propertyType") as string | undefined;
  const condition = extractValue(row, "condition") as string | undefined;

  // Validate required fields
  if (!address) {
    errors.push(`Row ${rowIndex + 1}: Missing required field: address`);
  }
  if (salePrice === undefined || salePrice <= 0) {
    errors.push(`Row ${rowIndex + 1}: Missing or invalid salePrice`);
  }
  if (!saleDate) {
    errors.push(`Row ${rowIndex + 1}: Missing required field: saleDate`);
  }
  if (gla === undefined || gla <= 0) {
    errors.push(`Row ${rowIndex + 1}: Missing or invalid gla`);
  }
  if (beds === undefined || beds <= 0) {
    errors.push(`Row ${rowIndex + 1}: Missing or invalid beds`);
  }
  if (baths === undefined || baths <= 0) {
    errors.push(`Row ${rowIndex + 1}: Missing or invalid baths`);
  }
  if (yearBuilt === undefined || yearBuilt < 1800) {
    errors.push(`Row ${rowIndex + 1}: Missing or invalid yearBuilt`);
  }

  // Warnings for optional fields
  if (lotSize === undefined) {
    warnings.push(`Row ${rowIndex + 1}: Missing optional field: lotSize`);
  }
  if (latitude === undefined || longitude === undefined) {
    warnings.push(
      `Row ${rowIndex + 1}: Missing optional fields: latitude/longitude`
    );
  }

  // If we have critical errors, return null
  if (errors.length > 0) {
    return { comp: null, errors, warnings };
  }

  // Build the comp object
  const comp: ParsedComp = {
    address: address!,
    salePrice: salePrice!,
    saleDate: saleDate!,
    gla: gla!,
    beds: Math.floor(beds!),
    baths: baths!,
    yearBuilt: Math.floor(yearBuilt!),
    lotSize: lotSize ?? 0,
  };

  // Add optional fields
  if (latitude !== undefined && longitude !== undefined) {
    comp.latitude = latitude;
    comp.longitude = longitude;
  }

  // Normalize property type before validation
  const normalizedPropertyType = normalizePropertyType(propertyType);
  if (normalizedPropertyType) {
    comp.propertyType = normalizedPropertyType;
  }

  if (condition) {
    comp.condition = condition as any;
  }

  // Validate with Zod schema
  const validationResult = ComparablePropertySchema.safeParse(comp);
  if (!validationResult.success) {
    errors.push(
      `Row ${rowIndex + 1}: Validation failed: ${
        validationResult.error.message
      }`
    );
    return { comp: null, errors, warnings };
  }

  return { comp: validationResult.data as ParsedComp, errors, warnings };
}

/**
 * Parse CSV content and extract comparable properties
 */
export async function parseCSV(csvContent: string): Promise<ParseResult> {
  const errors: string[] = [];
  const warnings: string[] = [];
  const comps: ParsedComp[] = [];

  try {
    // Parse CSV with PapaParse
    const parseResult = Papa.parse<Record<string, unknown>>(csvContent, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header: string) => header.trim(),
      transform: (value: unknown) => {
        // Trim string values
        if (typeof value === "string") {
          return value.trim();
        }
        return value;
      },
    });

    if (parseResult.errors.length > 0) {
      const parseErrors = parseResult.errors.map(
        (err: any) => `CSV parse error: ${err.message} (row ${err.row})`
      );
      return {
        success: false,
        comps: [],
        errors: parseErrors,
        warnings: [],
      };
    }

    if (parseResult.data.length === 0) {
      return {
        success: false,
        comps: [],
        errors: ["CSV file is empty or has no valid rows"],
        warnings: [],
      };
    }

    // Parse each row
    for (let i = 0; i < parseResult.data.length; i++) {
      const row = parseResult.data[i];
      const {
        comp,
        errors: rowErrors,
        warnings: rowWarnings,
      } = parseRow(row, i);

      errors.push(...rowErrors);
      warnings.push(...rowWarnings);

      if (comp) {
        comps.push(comp);
      }
    }

    // If we have no valid comps, return error
    if (comps.length === 0) {
      return {
        success: false,
        comps: [],
        errors:
          errors.length > 0 ? errors : ["No valid comparable properties found"],
        warnings,
      };
    }

    return {
      success: true,
      comps,
      errors,
      warnings,
    };
  } catch (error) {
    return {
      success: false,
      comps: [],
      errors: [
        `Failed to parse CSV: ${
          error instanceof Error ? error.message : String(error)
        }`,
      ],
      warnings,
    };
  }
}

/**
 * Validate a parsed comp
 */
export function validateComp(comp: ParsedComp): boolean {
  const result = ComparablePropertySchema.safeParse(comp);
  return result.success;
}
