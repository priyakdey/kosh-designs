import api from "./api";
import type { CreditCardData } from "@/types";

export async function getCreditCards(): Promise<CreditCardData> {
  const res = await api.get<CreditCardData>("/credit-cards.json");
  return res.data;
}
