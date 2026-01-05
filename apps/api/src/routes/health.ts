import { FastifyPluginAsync } from 'fastify';

// Health check route
export const healthRouter: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', async (request, reply) => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      requestId: request.id,
    };
  });
};

