import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// For prisma generate, DATABASE_URL is not required
// Use a placeholder if not set (only needed for migrations)
const databaseUrl =
  process.env.DATABASE_URL ||
  "postgresql://placeholder:placeholder@localhost:5432/placeholder";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl,
  },
});
