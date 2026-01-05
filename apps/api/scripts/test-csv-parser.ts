/**
 * Test script for CSV parser endpoint
 */

import { readFileSync } from "fs";
import { join } from "path";
import FormData from "form-data";
import fetch from "node-fetch";

async function testCSVParser() {
  const csvPath = join(process.cwd(), "data", "example-comps.csv");
  const csvContent = readFileSync(csvPath, "utf-8");

  const formData = new FormData();
  formData.append("file", Buffer.from(csvContent), {
    filename: "example-comps.csv",
    contentType: "text/csv",
  });

  try {
    const response = await fetch("http://localhost:3000/api/v1/parser/csv", {
      method: "POST",
      body: formData,
      headers: formData.getHeaders(),
    });

    const result = await response.json();

    console.log("Response Status:", response.status);
    console.log("Success:", result.success);
    console.log("Comps Count:", result.comps?.length || 0);
    console.log("Errors Count:", result.errors?.length || 0);
    console.log("Warnings Count:", result.warnings?.length || 0);

    if (result.success) {
      console.log("\n✅ CSV parsing successful!");
      if (result.comps && result.comps.length > 0) {
        console.log("\nFirst comp:", JSON.stringify(result.comps[0], null, 2));
      }
    } else {
      console.log("\n❌ CSV parsing failed!");
      if (result.errors && result.errors.length > 0) {
        console.log("\nErrors:");
        result.errors.slice(0, 5).forEach((err: string) => console.log("  -", err));
      }
    }

    if (result.warnings && result.warnings.length > 0) {
      console.log("\nWarnings:");
      result.warnings.slice(0, 5).forEach((warn: string) => console.log("  -", warn));
    }
  } catch (error) {
    console.error("Error testing CSV parser:", error);
    process.exit(1);
  }
}

testCSVParser();

