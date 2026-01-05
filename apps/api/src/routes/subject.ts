/**
 * Subject Property Validation Route
 * POST /api/v1/subject/validate
 */

import { FastifyPluginAsync } from "fastify";
import {
  validateSubjectProperty,
  geocodeAddress,
} from "../services/subject/index.js";
import { validateBody } from "../utils/validation.js";
import { SubjectPropertyInputSchema } from "@clearvalue/shared";
import { logError } from "../utils/logger.js";

export const subjectRouter: FastifyPluginAsync = async (fastify) => {
  fastify.post("/validate", async (request, reply) => {
    try {
      // Validate request body
      const input = await validateBody(
        SubjectPropertyInputSchema,
        request,
        reply
      );

      // Validate subject property
      const validationResult = validateSubjectProperty(input);

      if (!validationResult.valid || !validationResult.normalized) {
        return reply.status(400).send({
          valid: false,
          errors: validationResult.errors,
          code: "VALIDATION_ERROR",
        });
      }

      const normalized = validationResult.normalized;

      // Attempt geocoding (graceful failure if it fails)
      const coordinates = await geocodeAddress(normalized.address);
      if (coordinates) {
        normalized.coordinates = coordinates;
      }

      // Return success response
      return reply.status(200).send({
        valid: true,
        normalized: {
          address: normalized.address,
          coordinates: normalized.coordinates,
          beds: normalized.beds,
          baths: normalized.baths,
          gla: normalized.gla,
          lotSize: normalized.lotSize,
          yearBuilt: normalized.yearBuilt,
          age: normalized.age,
          propertyType: normalized.propertyType,
          condition: normalized.condition,
          finishLevel: normalized.finishLevel,
          notes: normalized.notes,
        },
      });
    } catch (error) {
      logError(fastify.log, error instanceof Error ? error : new Error(String(error)), {
        method: request.method,
        url: request.url,
        requestId: request.id,
      });

      // Check if it's a validation error
      if (error && typeof error === "object" && "code" in error && error.code === "VALIDATION_ERROR") {
        return reply.status(400).send({
          valid: false,
          errors: [
            {
              field: "unknown",
              message: error instanceof Error ? error.message : String(error),
            },
          ],
          code: "VALIDATION_ERROR",
        });
      }

      return reply.status(500).send({
        valid: false,
        error: "Internal server error",
        message: error instanceof Error ? error.message : String(error),
        code: "INTERNAL_ERROR",
      });
    }
  });
};

