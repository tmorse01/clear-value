/**
 * Request/Response logging plugin
 * Logs all incoming requests and responses with timing information
 */

import { FastifyPluginAsync } from 'fastify';
import { logRequest, logResponse } from '../utils/logger.js';

export const requestLoggingPlugin: FastifyPluginAsync = async (fastify) => {
  // Log incoming request
  fastify.addHook('onRequest', async (request) => {
    logRequest(fastify.log, request);
  });

  // Log response with timing
  fastify.addHook('onResponse', async (request, reply) => {
    const responseTime = reply.getResponseTime();
    logResponse(fastify.log, request, reply, responseTime);
  });
};

