/**
 * Request/Response logging plugin
 * Logs all incoming requests and responses with timing information
 */

import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { logRequest, logResponse } from '../utils/logger.js';

interface RequestWithStartTime extends FastifyRequest {
  startTime?: number;
}

export const requestLoggingPlugin: FastifyPluginAsync = async (fastify) => {
  // Log incoming request and store start time
  fastify.addHook('onRequest', async (request) => {
    (request as RequestWithStartTime).startTime = Date.now();
    logRequest(fastify.log, request);
  });

  // Log response with timing
  fastify.addHook('onResponse', async (request, reply) => {
    const startTime = (request as RequestWithStartTime).startTime;
    const responseTime = startTime ? Date.now() - startTime : 0;
    logResponse(fastify.log, request, reply, responseTime);
  });
};

