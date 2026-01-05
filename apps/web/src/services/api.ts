import { apiConfig } from "../config/api";
import type {
  ParsedComp,
} from "@clearvalue/shared";
import type {
  SubjectProperty,
  ComparableProperty,
  RegressionConfig,
} from "@clearvalue/shared";
import type { Report } from "@clearvalue/shared";

// API Error types
export interface ApiErrorResponse {
  success?: boolean;
  valid?: boolean;
  error?: string;
  message?: string;
  code?: string;
  details?: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

export class ApiError extends Error {
  status?: number;
  code?: string;
  details?: string;

  constructor(
    message: string,
    status?: number,
    code?: string,
    details?: string
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

// Generic API client function
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${apiConfig.baseURL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...apiConfig.headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    let errorData: ApiErrorResponse | null = null;
    try {
      errorData = await response.json();
    } catch {
      // If response is not JSON, use status text
    }

    const errorMessage =
      errorData?.message ||
      errorData?.error ||
      errorData?.details ||
      response.statusText;

    throw new ApiError(
      errorMessage,
      response.status,
      errorData?.code,
      errorData?.details
    );
  }

  return response.json();
}

// File upload helper
async function uploadFile<T>(
  endpoint: string,
  file: File,
  fieldName: string = "file"
): Promise<T> {
  const url = `${apiConfig.baseURL}${endpoint}`;
  const formData = new FormData();
  formData.append(fieldName, file);

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    let errorData: ApiErrorResponse | null = null;
    try {
      errorData = await response.json();
    } catch {
      // If response is not JSON, use status text
    }

    const errorMessage =
      errorData?.message ||
      errorData?.error ||
      errorData?.details ||
      response.statusText;

    throw new ApiError(
      errorMessage,
      response.status,
      errorData?.code,
      errorData?.details
    );
  }

  return response.json();
}

// Health check
export async function checkHealth() {
  return apiRequest<{ status: string; timestamp?: string }>("/health");
}

// CSV Parser Service
export interface CSVParserResponse {
  success: boolean;
  comps: ParsedComp[];
  errors: string[];
  warnings: string[];
}

export async function parseCSV(file: File): Promise<CSVParserResponse> {
  return uploadFile<CSVParserResponse>("/api/v1/parser/csv", file);
}

// Subject Property Service
export interface SubjectPropertyInput {
  address: string;
  beds: number;
  baths: number;
  gla: number;
  lotSize: number;
  yearBuilt: number;
  propertyType?: string;
  condition?: string;
  notes?: string;
}

export interface SubjectValidationResponse {
  valid: boolean;
  normalized?: SubjectProperty;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

export async function validateSubject(
  data: SubjectPropertyInput
): Promise<SubjectValidationResponse> {
  return apiRequest<SubjectValidationResponse>("/api/v1/subject/validate", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// Report Service
export interface ReportGenerateRequest {
  subject: SubjectProperty;
  comps: ComparableProperty[];
  config: RegressionConfig;
}

export async function generateReport(
  data: ReportGenerateRequest
): Promise<Report> {
  return apiRequest<Report>("/api/v1/report/generate", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// PDF Export Service
export async function exportPDF(reportId: string): Promise<Blob> {
  const url = `${apiConfig.baseURL}/api/v1/report/export-pdf`;
  
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ reportId }),
  });

  if (!response.ok) {
    let errorData: ApiErrorResponse | null = null;
    try {
      errorData = await response.json();
    } catch {
      // If response is not JSON, use status text
    }

    const errorMessage =
      errorData?.message ||
      errorData?.error ||
      response.statusText;

    throw new ApiError(
      errorMessage,
      response.status,
      errorData?.code
    );
  }

  return response.blob();
}

