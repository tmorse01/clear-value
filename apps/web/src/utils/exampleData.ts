/**
 * Utility functions for loading example/development data
 */

import { parseCSV } from "../services/parserService";
import type {
  ComparableProperty,
  PropertyType,
  PropertyCondition,
  SubjectProperty,
} from "@clearvalue/shared";
import type { ParsedComp } from "@clearvalue/shared";

/**
 * Load and parse the example CSV file
 */
export async function loadExampleCSV(): Promise<{
  comps: ComparableProperty[];
  subject: SubjectProperty;
}> {
  try {
    // Fetch the example CSV from public folder
    const response = await fetch("/example-comps.csv");
    if (!response.ok) {
      throw new Error("Failed to load example CSV file");
    }

    const csvText = await response.text();
    
    // Create a File object from the CSV text
    const blob = new Blob([csvText], { type: "text/csv" });
    const file = new File([blob], "example-comps.csv", { type: "text/csv" });

    // Parse the CSV
    const result = await parseCSV(file);

    if (!result.success || result.comps.length === 0) {
      throw new Error("Failed to parse example CSV or no data found");
    }

    // Convert ParsedComp to ComparableProperty
    const comps: ComparableProperty[] = result.comps.map((comp: ParsedComp) => {
      const yearBuilt =
        typeof comp.yearBuilt === "number" ? comp.yearBuilt : 0;
      return {
        address: typeof comp.address === "string" ? comp.address : "",
        salePrice:
          typeof comp.salePrice === "number" ? comp.salePrice : 0,
        saleDate:
          typeof comp.saleDate === "string" ? comp.saleDate : "",
        gla: typeof comp.gla === "number" ? comp.gla : 0,
        beds: typeof comp.beds === "number" ? comp.beds : 0,
        baths: typeof comp.baths === "number" ? comp.baths : 0,
        lotSize: typeof comp.lotSize === "number" ? comp.lotSize : 0,
        yearBuilt,
        propertyType: comp.propertyType as PropertyType | undefined,
        condition: comp.condition as PropertyCondition | undefined,
        latitude:
          typeof comp.latitude === "number" ? comp.latitude : undefined,
        longitude:
          typeof comp.longitude === "number"
            ? comp.longitude
            : undefined,
        age: new Date().getFullYear() - yearBuilt,
      };
    });

    // Use the first property as the subject property
    const firstComp = comps[0];
    const subject: SubjectProperty = {
      address: firstComp.address,
      beds: firstComp.beds,
      baths: firstComp.baths,
      gla: firstComp.gla,
      lotSize: firstComp.lotSize,
      yearBuilt: firstComp.yearBuilt,
      propertyType: firstComp.propertyType || "single_family",
      condition: firstComp.condition,
      latitude: firstComp.latitude,
      longitude: firstComp.longitude,
      age: firstComp.age,
      notes: "Example data - for development/testing purposes",
    };

    // Return all comps (including the first one as a comp)
    return { comps, subject };
  } catch (error) {
    throw new Error(
      `Failed to load example data: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

