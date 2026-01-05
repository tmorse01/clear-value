import { FastifyPluginAsync } from 'fastify';
// Import route modules as they are created
// import { parserRouter } from './parser.js';
// import { subjectRouter } from './subject.js';
// import { reportRouter } from './report.js';

/**
 * API v1 Router
 * All v1 endpoints are registered here
 */
export const v1Router: FastifyPluginAsync = async (fastify) => {
  // Register sub-routers
  // await fastify.register(parserRouter, { prefix: '/parser' });
  // await fastify.register(subjectRouter, { prefix: '/subject' });
  // await fastify.register(reportRouter, { prefix: '/report' });

  // Placeholder route
  fastify.get('/', async (request, reply) => {
    return {
      version: '1.0',
      status: 'active',
    };
  });
};

