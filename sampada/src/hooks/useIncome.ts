import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import type { IncomeData } from "@/types";

export function useIncome() {
  return useQuery({
    queryKey: ["income"],
    queryFn: async () => {
      const res = await api.get<IncomeData>("/income.json");
      return res.data;
    },
  });
}
