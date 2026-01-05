/**
 * Report ID Generator
 * Generates unique report IDs
 */

/**
 * Generate a unique report ID
 * Format: report_<timestamp>_<random>
 */
export function generateReportId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  return `report_${timestamp}_${random}`;
}

