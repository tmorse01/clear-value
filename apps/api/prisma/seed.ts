/**
 * Prisma seed script
 * Creates test data for development
 * Run with: pnpm --filter api db:seed
 */

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...\n");

  // Create test user
  const testUser = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      email: "test@example.com",
      auth0Id: "auth0|test-user-dev",
      subscriptionTier: "free",
      reportsGenerated: 0,
    },
  });

  console.log("✅ Created test user:");
  console.log(`   ID: ${testUser.id}`);
  console.log(`   Email: ${testUser.email}`);
  console.log(`   Subscription: ${testUser.subscriptionTier}`);
  console.log(`   Auth0 ID: ${testUser.auth0Id || "none"}\n`);

  // Optionally create additional test users
  const proUser = await prisma.user.upsert({
    where: { email: "pro@example.com" },
    update: {},
    create: {
      email: "pro@example.com",
      auth0Id: "auth0|pro-user-dev",
      subscriptionTier: "pro",
      reportsGenerated: 5,
    },
  });

  console.log("✅ Created pro test user:");
  console.log(`   ID: ${proUser.id}`);
  console.log(`   Email: ${proUser.email}`);
  console.log(`   Subscription: ${proUser.subscriptionTier}\n`);

  console.log("✨ Seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

