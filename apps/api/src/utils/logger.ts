/**
 * Logger utilities and helpers
 * Extends Fastify's built-in Pino logger with additional functionality
 */

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * Get request logger with request ID context
 */
export function getRequestLogger(
  request: FastifyRequest,
  reply: FastifyReply
): FastifyRequest['log'] {
  return request.log.child({ requestId: request.id });
}

/**
 * Log request details
 */
export function logRequest(
  logger: FastifyInstance['log'],
  request: FastifyRequest
): void {
  logger.info(
    {
      method: request.method,
      url: request.url,
      headers: sanitizeHeaders(request.headers),
      query: request.query,
      ip: request.ip,
      requestId: request.id,
    },
    'Incoming request'
  );
}

/**
 * Log response details
 */
export function logResponse(
  logger: FastifyInstance['log'],
  request: FastifyRequest,
  reply: FastifyReply,
  responseTime: number
): void {
  logger.info(
    {
      method: request.method,
      url: request.url,
      statusCode: reply.statusCode,
      responseTime,
      requestId: request.id,
    },
    'Request completed'
  );
}

/**
 * Sanitize headers to remove sensitive information
 */
function sanitizeHeaders(headers: Record<string, unknown>): Record<string, unknown> {
  const sensitive = ['authorization', 'cookie', 'x-api-key'];
  const sanitized = { ...headers };
  
  for (const key of sensitive) {
    if (sanitized[key]) {
      sanitized[key] = '[REDACTED]';
    }
  }
  
  return sanitized;
}

/**
 * Create structured error log
 */
export function logError(
  logger: FastifyInstance['log'],
  error: Error,
  context?: Record<string, unknown>
): void {
  logger.error(
    {
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
      ...context,
    },
    'Error occurred'
  );
}

