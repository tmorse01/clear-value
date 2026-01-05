import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";
import { apiRequest } from "../services/api";

// Generic hook for API queries
export function useApiQuery<T>(
  endpoint: string,
  options?: Omit<UseQueryOptions<T>, "queryKey" | "queryFn">
) {
  return useQuery<T>({
    queryKey: [endpoint],
    queryFn: () => apiRequest<T>(endpoint),
    ...options,
  });
}

