import { useQuery } from "@tanstack/react-query";
import httpClient from "@/services/httpClient";
import type { ExpenseData } from "@/types";

export function useExpenses() {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: async ({ signal }) => {
      const res = await httpClient.get<ExpenseData>("/expenses", { signal });
      return res.data;
    },
  });
}
