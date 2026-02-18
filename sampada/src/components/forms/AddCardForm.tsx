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
  addCardSchema,
  type AddCardFormValues,
  CARD_NETWORK_OPTIONS,
} from "@/schemas/creditCardSchema";
import { AppSelect } from "@/components/shared/AppSelect";
import { DatePicker } from "@/components/shared/DatePicker";

interface AddCardFormProps {
  onSubmit: (values: AddCardFormValues) => void;
  onCancel: () => void;
}

const inputClasses =
  "w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500";

export function AddCardForm({ onSubmit, onCancel }: AddCardFormProps) {
  const form = useForm<AddCardFormValues>({
    resolver: zodResolver(addCardSchema) as Resolver<AddCardFormValues>,
    defaultValues: {
      bankName: "",
      cardVariant: "",
      network: undefined,
      last4: "",
      creditLimit: undefined,
      outstanding: undefined,
      billingDate: "",
      dueDate: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium mb-2">
                  Bank Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <input
                    type="text"
                    placeholder="e.g., Axis Bank"
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
            name="cardVariant"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium mb-2">
                  Type <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <input
                    type="text"
                    placeholder="e.g., Regalia"
                    className={inputClasses}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="network"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium mb-2">
                Network <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <AppSelect
                  value={field.value ?? undefined}
                  onChange={field.onChange}
                  options={CARD_NETWORK_OPTIONS}
                  placeholder="Select network..."
                  className="h-11"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="last4"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium mb-2">
                  Last 4 Digits <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="1234"
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
            name="creditLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium mb-2">
                  Credit Limit (INR) <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <input
                    type="number"
                    min={10000}
                    step={1000}
                    placeholder="100000"
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
            name="outstanding"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium mb-2">
                  Outstanding (INR) <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <input
                    type="number"
                    min={0}
                    step={100}
                    placeholder="0"
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="billingDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium mb-2">
                  Billing Date <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select billing date"
                    className="h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium mb-2">
                  Due Date <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select due date"
                    className="h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-sm text-amber-800 dark:text-amber-300">
          Security : we intentionally capture only last 4 digits to be safe.
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
            Save Card
          </button>
        </div>
      </form>
    </Form>
  );
}
