import { useQuery } from "@tanstack/react-query";
import { getCreditCards } from "@/services/creditCardsApi";

export function useCreditCards() {
  return useQuery({
    queryKey: ["creditCards"],
    queryFn: getCreditCards,
  });
}
