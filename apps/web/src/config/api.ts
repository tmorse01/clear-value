// API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
  },
};

// API endpoints
export const endpoints = {
  health: "/health",
  parseCSV: "/api/v1/parser/csv",
  validateSubject: "/api/v1/subject/validate",
  generateReport: "/api/v1/report/generate",
  exportPDF: "/api/v1/report/export-pdf",
} as const;

