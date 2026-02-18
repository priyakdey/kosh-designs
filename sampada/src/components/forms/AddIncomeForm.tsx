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
  incomeSchema,
  type IncomeFormValues,
  INCOME_SOURCE_OPTIONS,
  CURRENCY_OPTIONS,
  RECURRENCE_OPTIONS,
} from "@/schemas/incomeSchema";
import { AppSelect } from "@/components/shared/AppSelect";
import { DatePicker } from "@/components/shared/DatePicker";

interface AddIncomeFormProps {
  onSubmit: (values: IncomeFormValues) => void;
  onCancel: () => void;
}

const inputClasses =
  "w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500";

export function AddIncomeForm({ onSubmit, onCancel }: AddIncomeFormProps) {
  const form = useForm<IncomeFormValues>({
    resolver: zodResolver(incomeSchema) as Resolver<IncomeFormValues>,
    defaultValues: {
      source: undefined,
      amount: undefined,
      currency: "INR",
      description: "",
      date: new Date().toISOString().split("T")[0],
      isRecurring: false,
      recurrencePattern: "month",
      recurrenceStartDate: new Date().toISOString().split("T")[0],
    },
  });

  const isRecurring = form.watch("isRecurring");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium mb-2">
                Source <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <AppSelect
                  value={field.value ?? undefined}
                  onChange={field.onChange}
                  options={INCOME_SOURCE_OPTIONS}
                  placeholder="Select source..."
                  className="h-11"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel className="block text-sm font-medium mb-2">
                  Amount <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <input
                    type="number"
                    placeholder="0.00"
                    step="0.01"
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
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium mb-2">
                  Currency
                </FormLabel>
                <FormControl>
                  <AppSelect
                    value={field.value}
                    onChange={field.onChange}
                    options={CURRENCY_OPTIONS}
                    className="h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium mb-2">
                Description
              </FormLabel>
              <FormControl>
                <input
                  type="text"
                  placeholder="e.g., Monthly salary from Visa"
                  className={inputClasses}
                  {...field}
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

        {/* Recurrence Section */}
        <FormField
          control={form.control}
          name="isRecurring"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormControl>
                  <input
                    id="income-recurring"
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                </FormControl>
                <label
                  htmlFor="income-recurring"
                  className="ml-2 text-sm font-medium"
                >
                  This is a recurring income
                </label>
              </div>
            </FormItem>
          )}
        />

        {isRecurring && (
          <div className="p-4 bg-purple-50 dark:bg-purple-900/10 rounded-lg border border-purple-200 dark:border-purple-800">
            <label className="block text-sm font-medium mb-2">
              Recurrence Pattern
            </label>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <FormField
                control={form.control}
                name="recurrencePattern"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-600 dark:text-gray-400">
                        Every
                      </label>
                      <FormControl>
                        <AppSelect
                          value={field.value}
                          onChange={field.onChange}
                          options={RECURRENCE_OPTIONS}
                          className="flex-1 h-11"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="recurrenceStartDate"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        Starts On
                      </label>
                      <FormControl>
                        <DatePicker
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          placeholder="Start date"
                          className="flex-1 h-11"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Preview: Every {form.watch("recurrencePattern") ?? "month"}{" "}
              starting{" "}
              {form.watch("recurrenceStartDate")
                ? new Date(
                  form.watch("recurrenceStartDate")!,
                ).toLocaleDateString("en-IN", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
                : "..."}
            </p>
          </div>
        )}

        <div className="flex gap-3 pt-4">
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
            Save Income
          </button>
        </div>
      </form>
    </Form>
  );
}
