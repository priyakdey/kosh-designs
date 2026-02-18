import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  mutualFundTransactionSchema,
  type MutualFundTransactionFormValues,
  INVESTMENT_TYPE_OPTIONS,
  BROKER_OPTIONS,
} from "@/schemas/mutualFundTransactionSchema";
import { AppSelect } from "@/components/shared/AppSelect";
import { DatePicker } from "@/components/shared/DatePicker";

interface AddMutualFundTransactionFormProps {
  onSubmit: (values: MutualFundTransactionFormValues) => void;
  onCancel: () => void;
}

const inputClasses =
  "w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500";

function numericOnChange(
  fieldOnChange: (value: number | undefined) => void,
) {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    fieldOnChange(e.target.value === "" ? undefined : e.target.valueAsNumber);
  };
}

export function AddMutualFundTransactionForm({
  onSubmit,
  onCancel,
}: AddMutualFundTransactionFormProps) {
  const form = useForm<MutualFundTransactionFormValues>({
    resolver: zodResolver(
      mutualFundTransactionSchema,
    ) as Resolver<MutualFundTransactionFormValues>,
    defaultValues: {
      txType: "buy",
      scheme: "",
      investmentType: "lumpsum",
      investmentDate: new Date().toISOString().split("T")[0],
      investedAmount: undefined,
      broker: "",
      totalInvestedTillDate: undefined,
      currentValue: undefined,
    },
  });

  const txType = form.watch("txType");

  const switchTxType = (type: "buy" | "sell") => {
    if (type === "buy") {
      form.reset({
        txType: "buy",
        scheme: form.getValues("scheme"),
        investmentType: "lumpsum",
        investmentDate: new Date().toISOString().split("T")[0],
        investedAmount: undefined,
        broker: "",
        totalInvestedTillDate: undefined,
        currentValue: undefined,
      });
    } else {
      form.reset({
        txType: "sell",
        scheme: form.getValues("scheme"),
        saleDate: new Date().toISOString().split("T")[0],
        sellAmount: undefined,
        sellUnits: undefined,
        saleNav: undefined,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Transaction Type Toggle */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Transaction Type <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => switchTxType("buy")}
              className={`px-4 py-3 border-2 rounded-lg font-semibold transition-colors ${
                txType === "buy"
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                  : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              Buy
            </button>
            <button
              type="button"
              onClick={() => switchTxType("sell")}
              className={`px-4 py-3 border-2 rounded-lg font-semibold transition-colors ${
                txType === "sell"
                  ? "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                  : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              Sell
            </button>
          </div>
        </div>

        {/* Scheme Search */}
        <FormField
          control={form.control}
          name="scheme"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium mb-2">
                Mutual Fund Scheme <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search from 30K+ mutual funds..."
                    className={`${inputClasses} pl-10`}
                    {...field}
                  />
                </div>
              </FormControl>
              <FormDescription>
                e.g., Axis Bluechip Direct Growth, ICICI Technology Direct
                Growth
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Buy Fields */}
        {txType === "buy" && (
          <>
            <FormField
              control={form.control}
              name="investmentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium mb-2">
                    Investment Type <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <AppSelect
                      value={field.value}
                      onChange={field.onChange}
                      options={INVESTMENT_TYPE_OPTIONS}
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="investmentDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium mb-2">
                    Investment Date <span className="text-red-500">*</span>
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

            <FormField
              control={form.control}
              name="investedAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium mb-2">
                    Invested Amount (₹) <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <input
                      type="number"
                      placeholder="10000"
                      step="0.01"
                      className={inputClasses}
                      name={field.name}
                      ref={field.ref}
                      onBlur={field.onBlur}
                      onChange={numericOnChange(field.onChange)}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormDescription>
                    Amount you invested on this date (NAV will be fetched
                    automatically)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="broker"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium mb-2">
                    Broker/Platform
                  </FormLabel>
                  <FormControl>
                    <AppSelect
                      value={field.value ?? undefined}
                      onChange={field.onChange}
                      options={BROKER_OPTIONS}
                      placeholder="Select broker..."
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Optional Existing Holdings */}
            <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Optional: For Existing Holdings
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                If you already have this fund and want to track current value,
                enter these details
              </p>
            </div>

            <FormField
              control={form.control}
              name="totalInvestedTillDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium mb-2">
                    Total Invested Till Date (₹)
                  </FormLabel>
                  <FormControl>
                    <input
                      type="number"
                      placeholder="325000 (optional)"
                      step="0.01"
                      className={inputClasses}
                      name={field.name}
                      ref={field.ref}
                      onBlur={field.onBlur}
                      onChange={numericOnChange(field.onChange)}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormDescription>
                    Total amount you've invested in this fund over time
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currentValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium mb-2">
                    Current Value (₹)
                  </FormLabel>
                  <FormControl>
                    <input
                      type="number"
                      placeholder="425650 (optional)"
                      step="0.01"
                      className={inputClasses}
                      name={field.name}
                      ref={field.ref}
                      onBlur={field.onBlur}
                      onChange={numericOnChange(field.onChange)}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormDescription>
                    Current market value of your holdings
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {/* Sell Fields */}
        {txType === "sell" && (
          <>
            <FormField
              control={form.control}
              name="saleDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium mb-2">
                    Sale Date <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <DatePicker
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      placeholder="Select date"
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="sellAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium mb-2">
                      Sell Amount (₹)
                    </FormLabel>
                    <FormControl>
                      <input
                        type="number"
                        placeholder="50000"
                        step="0.01"
                        className={inputClasses}
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        onChange={numericOnChange(field.onChange)}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sellUnits"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium mb-2">
                      OR Units
                    </FormLabel>
                    <FormControl>
                      <input
                        type="number"
                        placeholder="850.50"
                        step="0.001"
                        className={inputClasses}
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        onChange={numericOnChange(field.onChange)}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 -mt-3">
              Enter either amount or units (NAV will be fetched automatically)
            </p>

            <FormField
              control={form.control}
              name="saleNav"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium mb-2">
                    Sale NAV (₹)
                  </FormLabel>
                  <FormControl>
                    <input
                      type="number"
                      placeholder="Auto-fetched (optional override)"
                      step="0.0001"
                      className={inputClasses}
                      name={field.name}
                      ref={field.ref}
                      onBlur={field.onBlur}
                      onChange={numericOnChange(field.onChange)}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormDescription>
                    NAV will be auto-fetched. You can override if needed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {/* Form Actions */}
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
            Add Transaction
          </button>
        </div>
      </form>
    </Form>
  );
}
