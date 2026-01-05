// Frontend-specific types
// Shared types should be imported from @clear-value/shared

export interface ApiError {
  message: string;
  status?: number;
}

export interface ApiResponse<T> {
  data: T;
  error?: ApiError;
}

