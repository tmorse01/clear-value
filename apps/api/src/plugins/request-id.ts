/**
 * Request ID plugin
 * Generates unique request IDs for tracing requests through the system
 */

import { FastifyPluginAsync } from 'fastify';
import { randomUUID } from 'crypto';

export const requestIdPlugin: FastifyPluginAsync = async (fastify) => {
  // Add request ID to all requests
  fastify.addHook('onRequest', async (request, reply) => {
    // Check if request ID is provided in headers (for distributed tracing)
    const requestId = request.headers['x-request-id'] as string || randomUUID();
    
    // Store in request object
    request.id = requestId;
    
    // Add to response headers
    reply.header('X-Request-ID', requestId);
    
    // Add to logger context
    request.log = request.log.child({ requestId });
  });
};

