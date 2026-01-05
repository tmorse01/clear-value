/**
 * Custom error classes for API
 */

export class APIError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export class ValidationError extends APIError {
  constructor(message: string, details?: unknown) {
    super(400, 'VALIDATION_ERROR', message, details);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends APIError {
  constructor(message: string) {
    super(404, 'NOT_FOUND', message);
    this.name = 'NotFoundError';
  }
}

export class InsufficientCompsError extends APIError {
  constructor(minRequired: number, received: number) {
    super(
      400,
      'INSUFFICIENT_COMPS',
      `Minimum ${minRequired} comps required, received ${received}`
    );
    this.name = 'InsufficientCompsError';
  }
}

export class RegressionError extends APIError {
  constructor(message: string, details?: unknown) {
    super(500, 'REGRESSION_FAILED', message, details);
    this.name = 'RegressionError';
  }
}

export class PDFGenerationError extends APIError {
  constructor(message: string, details?: unknown) {
    super(500, 'PDF_GENERATION_FAILED', message, details);
    this.name = 'PDFGenerationError';
  }
}

