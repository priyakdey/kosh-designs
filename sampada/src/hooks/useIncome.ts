import { useQuery } from "@tanstack/react-query";
import backendApi from "@/services/backendApi";
import type { IncomeData } from "@/types";

export function useIncome() {
  return useQuery({
    queryKey: ["income"],
    queryFn: async () => {
      const res = await backendApi.get<IncomeData>("/income");
      return res.data;
    },
  });
}
