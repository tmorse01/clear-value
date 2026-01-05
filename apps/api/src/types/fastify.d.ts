/**
 * TypeScript type extensions for Fastify
 */

import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    id: string;
  }
}

