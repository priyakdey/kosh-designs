import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import type { MutualFundData } from "@/types";

export function useMutualFunds() {
  return useQuery({
    queryKey: ["mutualFunds"],
    queryFn: async () => {
      const res = await api.get<MutualFundData>("/mutual-funds.json");
      return res.data;
    },
  });
}
