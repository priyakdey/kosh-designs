import type { IncomeData } from "@/types";
import httpClient from "./httpClient";

export async function getIncome(signal?: AbortSignal): Promise<IncomeData> {
    const res = await httpClient.get<IncomeData>("/income", { signal });
    return res.data;
}