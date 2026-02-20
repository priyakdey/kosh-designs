import { useQuery } from "@tanstack/react-query";
import httpClient from "@/services/httpClient";
import type { MutualFundData } from "@/types";

export function useMutualFunds() {
  return useQuery({
    queryKey: ["mutualFunds"],
    queryFn: async ({ signal }) => {
      const res = await httpClient.get<MutualFundData>("/mutual-funds", { signal });
      return res.data;
    },
  });
}
