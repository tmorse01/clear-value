import { confidenceColors } from "../theme/theme";
import type { ConfidenceGrade } from "@clearvalue/shared";

/**
 * Format a number as currency (USD)
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format a number with commas
 */
export function formatNumber(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Format a date string to a readable format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

/**
 * Format a date to ISO string (YYYY-MM-DD)
 */
export function formatDateISO(date: Date): string {
  return date.toISOString().split("T")[0];
}

/**
 * Get confidence grade color
 */
export function getConfidenceColor(grade: ConfidenceGrade): string {
  switch (grade) {
    case "A":
      return confidenceColors.gradeA;
    case "B":
      return confidenceColors.gradeB;
    case "C":
      return confidenceColors.gradeC;
    case "D":
      return confidenceColors.gradeD;
    default:
      return confidenceColors.gradeD;
  }
}

/**
 * Format confidence grade with score
 */
export function formatConfidenceGrade(
  grade: ConfidenceGrade,
  score: number
): string {
  return `${grade} (${formatNumber(score * 100, 1)}%)`;
}

/**
 * Format property address (truncate if too long)
 */
export function formatAddress(address: string, maxLength: number = 50): string {
  if (address.length <= maxLength) {
    return address;
  }
  return `${address.substring(0, maxLength - 3)}...`;
}

/**
 * Format square footage
 */
export function formatSquareFeet(sqft: number): string {
  return `${formatNumber(sqft, 0)} sqft`;
}

/**
 * Format lot size (acres)
 */
export function formatLotSize(acres: number): string {
  if (acres < 1) {
    return `${formatNumber(acres, 3)} acres`;
  }
  return `${formatNumber(acres, 2)} acres`;
}

/**
 * Format distance (miles)
 */
export function formatDistance(miles: number): string {
  if (miles < 1) {
    return `${formatNumber(miles * 5280, 0)} ft`;
  }
  return `${formatNumber(miles, 2)} mi`;
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${formatNumber(value * 100, decimals)}%`;
}

