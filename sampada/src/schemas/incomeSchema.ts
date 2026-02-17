import { z } from "zod";

const INCOME_SOURCES = [
  "salary",
  "dividend",
  "rental",
  "interest",
  "freelance",
  "bonus",
  "other",
] as const;

const CURRENCIES = ["INR", "USD", "EUR"] as const;

const RECURRENCE_PATTERNS = ["month", "week", "year"] as const;

export const incomeSchema = z
  .object({
    source: z.enum(INCOME_SOURCES, { message: "Please select a source" }),
    amount: z
      .number({ message: "Amount is required" })
      .positive("Amount must be greater than 0"),
    currency: z.enum(CURRENCIES).default("INR"),
    description: z.string().optional(),
    date: z.string().min(1, "Date is required"),
    isRecurring: z.boolean().default(false),
    recurrencePattern: z.enum(RECURRENCE_PATTERNS).optional(),
    recurrenceStartDate: z.string().optional(),
  })
  .refine(
    (data) =>
      !data.isRecurring ||
      (data.recurrencePattern !== undefined &&
        data.recurrenceStartDate !== undefined &&
        data.recurrenceStartDate.length > 0),
    {
      message: "Recurrence pattern and start date are required",
      path: ["recurrencePattern"],
    },
  );

export type IncomeFormValues = z.infer<typeof incomeSchema>;

export const INCOME_SOURCE_OPTIONS = [
  { value: "salary", label: "Salary" },
  { value: "dividend", label: "Dividend" },
  { value: "rental", label: "Rental Income" },
  { value: "interest", label: "Interest" },
  { value: "freelance", label: "Freelance" },
  { value: "bonus", label: "Bonus" },
  { value: "other", label: "Other" },
] as const;

export const CURRENCY_OPTIONS = [
  { value: "INR", label: "INR (₹)" },
  { value: "USD", label: "USD ($)" },
  { value: "EUR", label: "EUR (€)" },
] as const;

export const RECURRENCE_OPTIONS = [
  { value: "month", label: "month" },
  { value: "week", label: "week" },
  { value: "year", label: "year" },
] as const;
