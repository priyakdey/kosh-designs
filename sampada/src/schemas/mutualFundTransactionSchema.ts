import { z } from "zod";

const INVESTMENT_TYPES = ["lumpsum", "sip"] as const;

const BROKERS = [
  "zerodha",
  "groww",
  "paytm",
  "kuvera",
  "direct",
  "other",
] as const;

const buySchema = z.object({
  txType: z.literal("buy"),
  scheme: z.string().min(1, "Please search and select a mutual fund scheme"),
  investmentType: z.enum(INVESTMENT_TYPES).default("lumpsum"),
  investmentDate: z.string().min(1, "Investment date is required"),
  investedAmount: z
    .number({ message: "Invested amount is required" })
    .positive("Amount must be greater than 0"),
  broker: z.enum([...BROKERS, ""]).optional(),
  totalInvestedTillDate: z.number().positive().optional(),
  currentValue: z.number().positive().optional(),
});

const sellSchema = z.object({
  txType: z.literal("sell"),
  scheme: z.string().min(1, "Please search and select a mutual fund scheme"),
  saleDate: z.string().min(1, "Sale date is required"),
  sellAmount: z.number().positive().optional(),
  sellUnits: z.number().positive().optional(),
  saleNav: z.number().positive().optional(),
});

export const mutualFundTransactionSchema = z.discriminatedUnion("txType", [
  buySchema,
  sellSchema,
]);

export type MutualFundTransactionFormValues = z.infer<
  typeof mutualFundTransactionSchema
>;
export type MFBuyFormValues = z.infer<typeof buySchema>;
export type MFSellFormValues = z.infer<typeof sellSchema>;

export { INVESTMENT_TYPES, BROKERS };

export const INVESTMENT_TYPE_OPTIONS = [
  { value: "lumpsum", label: "Lumpsum" },
  { value: "sip", label: "SIP" },
] as const;

export const BROKER_OPTIONS = [
  { value: "zerodha", label: "Zerodha Coin" },
  { value: "groww", label: "Groww" },
  { value: "paytm", label: "Paytm Money" },
  { value: "kuvera", label: "Kuvera" },
  { value: "direct", label: "Direct/AMC" },
  { value: "other", label: "Other" },
] as const;
