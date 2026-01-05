// CSV Parser Service
// Location: apps/api/src/services/parser/

/**
 * Responsibilities:
 * - Parse MLS/Cloud CMA/RPR CSV exports
 * - Validate required fields
 * - Normalize data formats
 * - Handle missing/optional fields
 */

export { parseCSV, validateComp } from "./csvParser.js";
export type { ParsedComp, ParseResult } from "@clearvalue/shared";
