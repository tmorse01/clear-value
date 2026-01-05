/**
 * Validation utilities using Zod
 */

import { ZodSchema, ZodError } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import { ValidationError } from './errors.js';

/**
 * Validate request body with Zod schema
 */
export async function validateBody<T>(
  schema: ZodSchema<T>,
  request: FastifyRequest,
  reply: FastifyReply
): Promise<T> {
  try {
    return await schema.parseAsync(request.body);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ValidationError('Invalid request body', {
        issues: error.issues,
        errors: error.errors,
      });
    }
    throw error;
  }
}

/**
 * Validate request query parameters with Zod schema
 */
export async function validateQuery<T>(
  schema: ZodSchema<T>,
  request: FastifyRequest,
  reply: FastifyReply
): Promise<T> {
  try {
    return await schema.parseAsync(request.query);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ValidationError('Invalid query parameters', {
        issues: error.issues,
        errors: error.errors,
      });
    }
    throw error;
  }
}

/**
 * Validate request params with Zod schema
 */
export async function validateParams<T>(
  schema: ZodSchema<T>,
  request: FastifyRequest,
  reply: FastifyReply
): Promise<T> {
  try {
    return await schema.parseAsync(request.params);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ValidationError('Invalid route parameters', {
        issues: error.issues,
        errors: error.errors,
      });
    }
    throw error;
  }
}

/**
 * Create a Fastify preHandler for body validation
 */
export function createBodyValidator<T>(schema: ZodSchema<T>) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    request.body = await validateBody(schema, request, reply);
  };
}

/**
 * Create a Fastify preHandler for query validation
 */
export function createQueryValidator<T>(schema: ZodSchema<T>) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    request.query = await validateQuery(schema, request, reply);
  };
}

/**
 * Create a Fastify preHandler for params validation
 */
export function createParamsValidator<T>(schema: ZodSchema<T>) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    request.params = await validateParams(schema, request, reply);
  };
}

