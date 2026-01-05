/**
 * Report Generation Route
 * POST /api/v1/report/generate
 */

import { FastifyPluginAsync } from "fastify";
import { generateReport } from "../services/report/index.js";
import { validateBody } from "../utils/validation.js";
import { ReportGenerateRequestSchema, type RegressionConfig, type ComparableProperty } from "@clearvalue/shared";
import { validateSubjectProperty } from "../services/subject/index.js";
import { logError } from "../utils/logger.js";

export const reportRouter: FastifyPluginAsync = async (fastify) => {
  fastify.post("/generate", async (request, reply) => {
    try {
      // Validate request body
      const input = await validateBody(
        ReportGenerateRequestSchema,
        request,
        reply
      );

      // Validate and normalize subject property
      const subjectValidation = validateSubjectProperty(input.subject);
      if (!subjectValidation.valid || !subjectValidation.normalized) {
        return reply.status(400).send({
          error: "Invalid subject property",
          message: "Subject property validation failed",
          details: subjectValidation.errors,
          code: "VALIDATION_ERROR",
        });
      }

      const subject = subjectValidation.normalized;

      // Add coordinates if provided in input
      if (input.subject.coordinates) {
        subject.coordinates = input.subject.coordinates;
      }

      const config = input.config as RegressionConfig;

      // Validate comps count
      if (input.comps.length < config.minComps) {
        return reply.status(400).send({
          error: "Insufficient comps",
          message: `Minimum ${config.minComps} comps required, received ${input.comps.length}`,
          code: "INSUFFICIENT_COMPS",
        });
      }

      // Limit comps to maxComps (take most similar ones)
      let compsToUse = input.comps;
      if (compsToUse.length > config.maxComps) {
        // For now, just take the first maxComps
        // In the future, this could be sorted by similarity
        compsToUse = compsToUse.slice(0, config.maxComps);
      }

      // Ensure age is calculated for all comps (required by ComparableProperty type)
      const compsWithAge: ComparableProperty[] = compsToUse.map((comp) => {
        const currentYear = new Date().getFullYear();
        const age = comp.age !== undefined ? comp.age : Math.max(0, currentYear - comp.yearBuilt);
        return { ...comp, age } as ComparableProperty;
      });

      // Generate report
      const report = await generateReport(subject, compsWithAge, config);

      // Return success response
      return reply.status(200).send(report);
    } catch (error) {
      logError(fastify.log, error instanceof Error ? error : new Error(String(error)), {
        method: request.method,
        url: request.url,
        requestId: request.id,
      });

      // Check for specific error types
      if (error instanceof Error) {
        if (error.message.includes("Insufficient comps")) {
          return reply.status(400).send({
            error: "Insufficient comps",
            message: error.message,
            code: "INSUFFICIENT_COMPS",
          });
        }

        if (error.message.includes("validation") || error.message.includes("Validation")) {
          return reply.status(400).send({
            error: "Validation error",
            message: error.message,
            code: "VALIDATION_ERROR",
          });
        }
      }

      return reply.status(500).send({
        error: "Internal server error",
        message: error instanceof Error ? error.message : String(error),
        code: "INTERNAL_ERROR",
      });
    }
  });
};

