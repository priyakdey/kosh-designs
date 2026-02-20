import httpClient from "./httpClient";
import type { CreditCardData } from "@/types";

export async function getCreditCards(signal?: AbortSignal): Promise<CreditCardData> {
  const res = await httpClient.get<CreditCardData>("/credit-cards", { signal });
  return res.data;
}
