import { useQuery } from "@tanstack/react-query";
import { getIncome } from "@/services/incomeApi";

export function useIncome() {
  return useQuery({
    queryKey: ["income"],
    queryFn: async ({ signal }) => getIncome(signal),
  });
}
