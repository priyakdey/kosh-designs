import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import type { ExpenseData } from "@/types";

export function useExpenses() {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const res = await api.get<ExpenseData>("/expenses.json");
      return res.data;
    },
  });
}
