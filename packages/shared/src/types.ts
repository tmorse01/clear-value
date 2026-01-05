// Shared types across the application

export type CommonType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

// Re-export all type modules
export * from "./types/property.js";
export * from "./types/regression.js";
export * from "./types/report.js";
export * from "./types/parser.js";
