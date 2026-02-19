import backendApi from "./backendApi";
import type { CreditCardData } from "@/types";

export async function getCreditCards(): Promise<CreditCardData> {
  const res = await backendApi.get<CreditCardData>("/credit-cards");
  return res.data;
}
