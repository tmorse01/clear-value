/**
 * Prisma Client instance for database access
 * Prisma 7.2.0 requires an adapter to be passed to the constructor
 */

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client.js";
import * as pg from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// Create the Prisma adapter using connection string directly
// Prisma 7.2.0 supports both connectionString and pool
const adapter = new PrismaPg({ connectionString });

// Create Prisma Client with the adapter
const prisma = new PrismaClient({ adapter });

export { prisma };
