/**
 * Quick script to get test user info
 * Run with: tsx scripts/get-test-user.ts
 */

import "dotenv/config";
import { prisma } from "../src/lib/prisma.js";

async function main() {
  console.log("🔍 Fetching test users...\n");

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "asc" },
  });

  if (users.length === 0) {
    console.log("No users found. Run: pnpm --filter api db:seed");
    return;
  }

  console.log(`Found ${users.length} user(s):\n`);

  for (const user of users) {
    console.log(`📧 ${user.email}`);
    console.log(`   ID: ${user.id}`);
    console.log(`   Subscription: ${user.subscriptionTier}`);
    console.log(`   Reports Generated: ${user.reportsGenerated}`);
    console.log(`   Auth0 ID: ${user.auth0Id || "none"}`);
    console.log(`   Created: ${user.createdAt.toISOString()}`);
    console.log("");
  }

  // Get the test user specifically
  const testUser = await prisma.user.findUnique({
    where: { email: "test@example.com" },
  });

  if (testUser) {
    console.log("✅ Test user available:");
    console.log(`   Email: ${testUser.email}`);
    console.log(`   ID: ${testUser.id}`);
  }
}

main()
  .catch((e) => {
    console.error("Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

