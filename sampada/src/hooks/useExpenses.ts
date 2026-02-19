import { useQuery } from "@tanstack/react-query";
import backendApi from "@/services/backendApi";
import type { ExpenseData } from "@/types";

export function useExpenses() {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const res = await backendApi.get<ExpenseData>("/expenses");
      return res.data;
    },
  });
}
