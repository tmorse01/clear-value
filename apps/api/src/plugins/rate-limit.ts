/**
 * Rate limiting plugin (optional)
 * Can be enabled/disabled via configuration
 * 
 * Note: For MVP, rate limiting is disabled by default.
 * Enable this plugin when ready to add rate limiting.
 */

import { FastifyPluginAsync } from 'fastify';
import { getConfig } from '../config/env.js';

export const rateLimitPlugin: FastifyPluginAsync = async (fastify) => {
  const config = getConfig();
  
  // Rate limiting disabled for MVP
  // Uncomment and configure when needed:
  
  // await fastify.register(import('@fastify/rate-limit'), {
  //   max: 100, // Maximum number of requests
  //   timeWindow: '1 minute', // Time window
  //   errorResponseBuilder: (request, context) => {
  //     return {
  //       error: 'Rate Limit Exceeded',
  //       message: `Too many requests, please try again later`,
  //       code: 'RATE_LIMIT_EXCEEDED',
  //       retryAfter: Math.round(context.ttl / 1000),
  //     };
  //   },
  // });
  
  fastify.log.debug('Rate limiting plugin loaded (disabled for MVP)');
};

