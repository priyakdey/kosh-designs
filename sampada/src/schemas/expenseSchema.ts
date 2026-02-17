import { z } from "zod";

const EXPENSE_CATEGORIES = [
  "rent",
  "food",
  "transport",
  "utilities",
  "healthcare",
  "shopping",
  "entertainment",
  "education",
  "insurance",
  "emi",
  "other",
] as const;

const CURRENCIES = ["INR", "USD", "EUR"] as const;

const RECURRENCE_PATTERNS = ["month", "week", "year"] as const;

export const expenseSchema = z
  .object({
    category: z.enum(EXPENSE_CATEGORIES, {
      message: "Please select a category",
    }),
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

export type ExpenseFormValues = z.infer<typeof expenseSchema>;

export const EXPENSE_CATEGORY_OPTIONS = [
  { value: "rent", label: "Rent" },
  { value: "food", label: "Food & Dining" },
  { value: "transport", label: "Transport" },
  { value: "utilities", label: "Utilities" },
  { value: "healthcare", label: "Healthcare" },
  { value: "shopping", label: "Shopping" },
  { value: "entertainment", label: "Entertainment" },
  { value: "education", label: "Education" },
  { value: "insurance", label: "Insurance" },
  { value: "emi", label: "EMI" },
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
