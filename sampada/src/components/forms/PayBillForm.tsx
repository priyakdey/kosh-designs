import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  payBillSchema,
  type PayBillFormValues,
  PAYMENT_TYPE_OPTIONS,
} from "@/schemas/creditCardSchema";
import { AppSelect } from "@/components/shared/AppSelect";
import type { CreditCard } from "@/types";

interface PayBillFormProps {
  cards: CreditCard[];
  onSubmit: (values: PayBillFormValues) => void;
  onCancel: () => void;
}

const inputClasses =
  "w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500";

export function PayBillForm({ cards, onSubmit, onCancel }: PayBillFormProps) {
  const form = useForm<PayBillFormValues>({
    resolver: zodResolver(payBillSchema) as Resolver<PayBillFormValues>,
    defaultValues: {
      cardId: "",
      paymentType: "full",
      amount: undefined,
    },
  });

  const paymentType = form.watch("paymentType");
  const showAmount = paymentType === "min_due" || paymentType === "custom";

  const cardOptions = cards.map((c) => ({
    value: c.id,
    label: `${c.bankName} ${c.cardVariant} •••• ${c.last4}`,
  }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="cardId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium mb-2">
                Card <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <AppSelect
                  value={field.value || undefined}
                  onChange={field.onChange}
                  options={cardOptions}
                  placeholder="Select card..."
                  className="h-11"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paymentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium mb-2">
                Payment Type <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <AppSelect
                  value={field.value}
                  onChange={field.onChange}
                  options={PAYMENT_TYPE_OPTIONS}
                  className="h-11"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {showAmount && (
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium mb-2">
                  Amount (INR) <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <input
                    type="number"
                    min={1}
                    step={1}
                    placeholder="1000"
                    className={inputClasses}
                    name={field.name}
                    ref={field.ref}
                    onBlur={field.onBlur}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ""
                          ? undefined
                          : e.target.valueAsNumber,
                      )
                    }
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all"
          >
            Save Payment
          </button>
        </div>
      </form>
    </Form>
  );
}
