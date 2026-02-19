import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { AppSelect } from "@/components/shared";
import {
  profileSetupSchema,
  type ProfileSetupFormValues,
} from "@/schemas/profileSetupSchema";

function getBrowserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return "Asia/Kolkata";
  }
}

const BASE_TIMEZONE_OPTIONS = [
  { value: "Asia/Kolkata", label: "Asia/Kolkata (IST)" },
  { value: "America/New_York", label: "America/New_York (EST/EDT)" },
  { value: "America/Los_Angeles", label: "America/Los_Angeles (PST/PDT)" },
  { value: "Europe/London", label: "Europe/London (GMT/BST)" },
  { value: "Europe/Berlin", label: "Europe/Berlin (CET/CEST)" },
  { value: "Asia/Dubai", label: "Asia/Dubai (GST)" },
  { value: "Asia/Singapore", label: "Asia/Singapore (SGT)" },
];

const browserTz = getBrowserTimezone();
const TIMEZONE_OPTIONS = BASE_TIMEZONE_OPTIONS.some((o) => o.value === browserTz)
  ? BASE_TIMEZONE_OPTIONS
  : [{ value: browserTz, label: browserTz }, ...BASE_TIMEZONE_OPTIONS];

const CURRENCY_OPTIONS = [
  { value: "INR", label: "INR - Indian Rupee" },
  { value: "USD", label: "USD - US Dollar" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "GBP", label: "GBP - British Pound" },
  { value: "AED", label: "AED - UAE Dirham" },
  { value: "SGD", label: "SGD - Singapore Dollar" },
];

export function ProfileSetupModal() {
  const auth = useAuth();
  const [submitError, setSubmitError] = useState("");

  const form = useForm<ProfileSetupFormValues>({
    resolver: zodResolver(profileSetupSchema),
    defaultValues: {
      displayName: auth.user?.name ?? "",
      timezone: auth.user?.timezone || getBrowserTimezone(),
      currency: auth.user?.currency || "INR",
    },
  });

  const hasResetRef = useRef(false);
  useEffect(() => {
    if (!auth.requiresProfileSetup || !auth.user || hasResetRef.current) return;
    hasResetRef.current = true;
    form.reset({
      displayName: auth.user.name ?? "",
      timezone: auth.user.timezone || getBrowserTimezone(),
      currency: auth.user.currency || "INR",
    });
  }, [auth.requiresProfileSetup, auth.user, form]);

  if (auth.isLoading || !auth.requiresProfileSetup) {
    return null;
  }

  const onSubmit = async (data: ProfileSetupFormValues) => {
    setSubmitError("");
    try {
      await auth.completeProfileSetup({
        displayName: data.displayName,
        timezone: data.timezone,
        currency: data.currency,
      });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Could not save profile yet. Please try again.";
      setSubmitError(message);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-gray-950/45 backdrop-blur-sm flex items-center justify-center px-6">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-lg rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-2xl space-y-5"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Welcome to Sampada
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Configure your preferences to tailor your financial dashboard.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 italic">
            Takes less than 30 seconds
          </p>
        </div>

        <div className="block space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Display Name
          </label>
          <input
            type="text"
            {...form.register("displayName")}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {form.formState.errors.displayName && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {form.formState.errors.displayName.message}
            </p>
          )}
        </div>

        <div className="block space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Timezone
          </label>
          <Controller
            control={form.control}
            name="timezone"
            render={({ field }) => (
              <AppSelect
                value={field.value}
                onChange={field.onChange}
                options={TIMEZONE_OPTIONS}
                placeholder="Select timezone"
                className="h-11"
              />
            )}
          />
          {form.formState.errors.timezone && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {form.formState.errors.timezone.message}
            </p>
          )}
        </div>

        <div className="block space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Currency
          </label>
          <Controller
            control={form.control}
            name="currency"
            render={({ field }) => (
              <AppSelect
                value={field.value}
                onChange={field.onChange}
                options={CURRENCY_OPTIONS}
                placeholder="Select currency"
                className="h-11"
              />
            )}
          />
          {form.formState.errors.currency && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {form.formState.errors.currency.message}
            </p>
          )}
        </div>

        {submitError && (
          <p className="text-sm text-red-600 dark:text-red-400">{submitError}</p>
        )}

        <button
          type="submit"
          disabled={auth.isSettingUpProfile}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold disabled:opacity-70"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
