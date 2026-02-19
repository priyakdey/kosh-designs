import backendApi from "./backendApi";
import type { CreditCardData } from "@/types";

export async function getCreditCards(signal?: AbortSignal): Promise<CreditCardData> {
  const res = await backendApi.get<CreditCardData>("/credit-cards", { signal });
  return res.data;
}
