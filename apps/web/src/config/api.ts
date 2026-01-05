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
  // Add more endpoints as they are implemented
} as const;

