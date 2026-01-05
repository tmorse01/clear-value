/**
 * Geocoding Service
 * Converts addresses to coordinates using Google Maps Geocoding API
 */

import { Client } from "@googlemaps/google-maps-services-js";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Geocode an address to coordinates
 * Returns undefined if geocoding fails (graceful failure)
 */
export async function geocodeAddress(
  address: string
): Promise<Coordinates | undefined> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  // If no API key, return undefined (graceful failure)
  if (!apiKey) {
    return undefined;
  }

  try {
    const client = new Client({});

    const response = await client.geocode({
      params: {
        address,
        key: apiKey,
      },
    });

    if (
      response.data.status === "OK" &&
      response.data.results &&
      response.data.results.length > 0
    ) {
      const location = response.data.results[0].geometry.location;
      return {
        latitude: location.lat,
        longitude: location.lng,
      };
    }

    // Handle various error statuses gracefully
    if (response.data.status === "ZERO_RESULTS") {
      // No results found, but not an error - just return undefined
      return undefined;
    }

    // Other statuses (OVER_QUERY_LIMIT, REQUEST_DENIED, etc.) - return undefined
    return undefined;
  } catch (error) {
    // Log error but don't throw - graceful failure
    console.warn("Geocoding failed:", error instanceof Error ? error.message : String(error));
    return undefined;
  }
}

