/**
 * CSV Parser Route
 * POST /api/v1/parser/csv
 */

import { FastifyPluginAsync } from "fastify";
import { parseCSV } from "../services/parser/index.js";
import { logError } from "../utils/logger.js";

export const parserRouter: FastifyPluginAsync = async (fastify) => {
  fastify.post("/csv", async (request, reply) => {
    try {
      // Check if multipart data exists
      if (!request.isMultipart()) {
        return reply.status(400).send({
          success: false,
          error: "Invalid request format",
          details: "Request must be multipart/form-data with a 'file' field",
          code: "INVALID_CSV",
        });
      }

      // Get the file from multipart data
      const data = await request.file();

      if (!data) {
        return reply.status(400).send({
          success: false,
          error: "Missing file",
          details: "No file provided in 'file' field",
          code: "INVALID_CSV",
        });
      }

      // Check file type
      if (data.mimetype !== "text/csv" && !data.filename?.endsWith(".csv")) {
        return reply.status(400).send({
          success: false,
          error: "Invalid file type",
          details: "File must be a CSV file",
          code: "INVALID_CSV",
        });
      }

      // Read file content
      const buffer = await data.toBuffer();
      const csvContent = buffer.toString("utf-8");

      if (!csvContent || csvContent.trim().length === 0) {
        return reply.status(400).send({
          success: false,
          error: "Empty file",
          details: "CSV file is empty",
          code: "INVALID_CSV",
        });
      }

      // Parse CSV
      const result = await parseCSV(csvContent);

      if (!result.success) {
        return reply.status(400).send({
          success: false,
          error: "CSV parsing failed",
          details: result.errors.join("; "),
          errors: result.errors,
          warnings: result.warnings,
          code: "INVALID_CSV",
        });
      }

      // Return success response
      return reply.status(200).send({
        success: true,
        comps: result.comps,
        errors: result.errors,
        warnings: result.warnings,
      });
    } catch (error) {
      logError(fastify.log, error instanceof Error ? error : new Error(String(error)), {
        method: request.method,
        url: request.url,
        requestId: request.id,
      });

      return reply.status(500).send({
        success: false,
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
        code: "INTERNAL_ERROR",
      });
    }
  });
};

