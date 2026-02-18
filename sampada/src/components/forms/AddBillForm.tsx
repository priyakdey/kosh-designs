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
import { addBillSchema, type AddBillFormValues } from "@/schemas/creditCardSchema";
import { AppSelect } from "@/components/shared/AppSelect";
import { DatePicker } from "@/components/shared/DatePicker";
import type { CreditCard } from "@/types";

interface AddBillFormProps {
  cards: CreditCard[];
  onSubmit: (values: AddBillFormValues) => void;
  onCancel: () => void;
}

const inputClasses =
  "w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500";

export function AddBillForm({ cards, onSubmit, onCancel }: AddBillFormProps) {
  const form = useForm<AddBillFormValues>({
    resolver: zodResolver(addBillSchema) as Resolver<AddBillFormValues>,
    defaultValues: {
      cardId: "",
      description: "",
      amount: undefined,
      date: new Date().toISOString().split("T")[0],
    },
  });

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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium mb-2">
                Description <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <input
                  type="text"
                  placeholder="e.g., Swiggy dinner"
                  className={inputClasses}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    placeholder="1200"
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
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium mb-2">
                  Date <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select date"
                    className="h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all"
          >
            Save Bill
          </button>
        </div>
      </form>
    </Form>
  );
}
