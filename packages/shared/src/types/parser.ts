/**
 * Parser-related types
 * Note: ParsedComp is essentially ComparableProperty from CSV
 */

import type { ComparableProperty } from "./property.js";

/**
 * Parsed comparable property from CSV
 * This is the normalized format after parsing various CSV formats
 */
export type ParsedComp = Omit<
  ComparableProperty,
  "age" | "distance" | "daysSinceSale"
> & {
  [key: string]: unknown; // Allow additional fields from CSV
};

export interface ParseResult {
  success: boolean;
  comps: ParsedComp[];
  errors: string[];
  warnings: string[];
}
