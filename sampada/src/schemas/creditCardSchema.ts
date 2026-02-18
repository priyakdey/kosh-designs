import { z } from "zod";

/* ------------------------------------------------------------------ */
/* Add Card                                                            */
/* ------------------------------------------------------------------ */

const CARD_NETWORKS = ["visa", "mastercard", "rupay", "amex", "diners"] as const;

export const addCardSchema = z.object({
  bankName: z.string().min(1, "Bank name is required"),
  cardVariant: z.string().min(1, "Card type is required"),
  network: z.enum(CARD_NETWORKS, { message: "Please select a network" }),
  last4: z
    .string()
    .length(4, "Must be exactly 4 digits")
    .regex(/^\d{4}$/, "Must be 4 digits"),
  creditLimit: z
    .number({ message: "Credit limit is required" })
    .min(10000, "Minimum limit is 10,000"),
  outstanding: z
    .number({ message: "Outstanding is required" })
    .min(0, "Cannot be negative"),
  billingDate: z.string().min(1, "Billing date is required"),
  dueDate: z.string().min(1, "Due date is required"),
});

export type AddCardFormValues = z.infer<typeof addCardSchema>;

export const CARD_NETWORK_OPTIONS = [
  { value: "visa", label: "Visa" },
  { value: "mastercard", label: "Mastercard" },
  { value: "rupay", label: "RuPay" },
  { value: "amex", label: "Amex" },
] as const;

/* ------------------------------------------------------------------ */
/* Add Bill                                                            */
/* ------------------------------------------------------------------ */

export const addBillSchema = z.object({
  cardId: z.string().min(1, "Please select a card"),
  description: z.string().min(1, "Description is required"),
  amount: z
    .number({ message: "Amount is required" })
    .positive("Amount must be greater than 0"),
  date: z.string().min(1, "Date is required"),
});

export type AddBillFormValues = z.infer<typeof addBillSchema>;

/* ------------------------------------------------------------------ */
/* Pay Bill                                                            */
/* ------------------------------------------------------------------ */

const PAYMENT_TYPES = ["full", "min_due", "custom"] as const;

export const payBillSchema = z
  .object({
    cardId: z.string().min(1, "Please select a card"),
    paymentType: z.enum(PAYMENT_TYPES, { message: "Select payment type" }),
    amount: z.number().optional(),
  })
  .refine(
    (data) =>
      data.paymentType === "full" ||
      (data.amount !== undefined && data.amount > 0),
    {
      message: "Amount is required for this payment type",
      path: ["amount"],
    },
  );

export type PayBillFormValues = z.infer<typeof payBillSchema>;

export const PAYMENT_TYPE_OPTIONS = [
  { value: "full", label: "Paid in full" },
  { value: "min_due", label: "Paid min due" },
  { value: "custom", label: "Paid custom" },
] as const;
