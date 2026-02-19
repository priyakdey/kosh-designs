import { useQuery } from "@tanstack/react-query";
import backendApi from "@/services/backendApi";
import type { MutualFundData } from "@/types";

export function useMutualFunds() {
  return useQuery({
    queryKey: ["mutualFunds"],
    queryFn: async ({ signal }) => {
      const res = await backendApi.get<MutualFundData>("/mutual-funds", { signal });
      return res.data;
    },
  });
}
