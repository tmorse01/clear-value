import Fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import { healthRouter } from './routes/health.js';
import { getConfig } from './config/env.js';
import { requestIdPlugin } from './plugins/request-id.js';
import { requestLoggingPlugin } from './plugins/request-logging.js';
import { logError } from './utils/logger.js';

export interface ServerOptions extends FastifyServerOptions {
  port?: number;
  host?: string;
}

export async function buildServer(options: ServerOptions = {}): Promise<FastifyInstance> {
  const config = getConfig();
  const { port = config.port, host = config.host, ...fastifyOptions } = options;

  const server = Fastify({
    logger: {
      level: config.nodeEnv === 'production' ? 'info' : 'debug',
      transport:
        config.nodeEnv === 'development'
          ? {
              target: 'pino-pretty',
              options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
              },
            }
          : undefined,
    },
    ...fastifyOptions,
  });

  // Register core plugins
  await server.register(requestIdPlugin);
  await server.register(requestLoggingPlugin);
  
  await server.register(cors, {
    origin: config.corsOrigin,
  });

  await server.register(multipart, {
    limits: {
      fileSize: config.maxFileSize,
    },
  });

  // Register routes
  await server.register(healthRouter, { prefix: '/health' });
  
  // API v1 routes
  const { v1Router } = await import('./routes/v1/index.js');
  await server.register(v1Router, { prefix: '/api/v1' });

  // Global error handler
  server.setErrorHandler((error: unknown, request, reply) => {
    const err = error instanceof Error ? error : new Error(String(error));
    logError(server.log, err, {
      method: request.method,
      url: request.url,
      requestId: request.id,
    });
    const nodeEnv = getConfig().nodeEnv;

    // Validation errors
    if (error && typeof error === 'object' && 'validation' in error && error.validation) {
      return reply.status(400).send({
        error: 'Validation Error',
        message: err.message,
        details: error.validation,
        code: 'VALIDATION_ERROR',
      });
    }

    // Default error response
    const statusCode = (error && typeof error === 'object' && 'statusCode' in error && typeof error.statusCode === 'number') 
      ? error.statusCode 
      : 500;
    const message = nodeEnv === 'production' 
      ? 'Internal Server Error' 
      : err.message;

    reply.status(statusCode).send({
      error: err.name || 'Internal Server Error',
      message,
      code: (error && typeof error === 'object' && 'code' in error && typeof error.code === 'string') ? error.code : 'INTERNAL_ERROR',
      ...(nodeEnv === 'development' && { stack: err.stack }),
    });
  });

  // 404 handler
  server.setNotFoundHandler((request, reply) => {
    reply.status(404).send({
      error: 'Not Found',
      message: `Route ${request.method} ${request.url} not found`,
      code: 'NOT_FOUND',
    });
  });

  return server;
}

export async function startServer(options: ServerOptions = {}): Promise<void> {
  const server = await buildServer(options);
  const config = getConfig();
  const { port = config.port, host = config.host } = options;

  // Graceful shutdown handlers
  const shutdown = async (signal: string) => {
    server.log.info({ signal }, 'Received shutdown signal, closing server...');
    
    try {
      await server.close();
      server.log.info('Server closed successfully');
      process.exit(0);
    } catch (err) {
      server.log.error({ err }, 'Error during shutdown');
      process.exit(1);
    }
  };

  // Register shutdown handlers
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));

  // Handle uncaught exceptions
  process.on('uncaughtException', (error) => {
    logError(server.log, error, { type: 'uncaughtException' });
    shutdown('uncaughtException');
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    const error = reason instanceof Error ? reason : new Error(String(reason));
    logError(server.log, error, { type: 'unhandledRejection', promise });
    shutdown('unhandledRejection');
  });

  try {
    await server.listen({ port, host });
    server.log.info({ port, host }, 'Server listening');
  } catch (err) {
    logError(server.log, err instanceof Error ? err : new Error(String(err)), {
      type: 'startup',
    });
    process.exit(1);
  }
}

