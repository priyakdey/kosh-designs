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
  const [setupError, setSetupError] = useState("");
  const [setupProgress, setSetupProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [keepModalOpen, setKeepModalOpen] = useState(false);

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

  useEffect(() => {
    if (!isSubmitting) {
      setSetupProgress(0);
      return;
    }

    const id = window.setInterval(() => {
      setSetupProgress((value) => Math.min(95, value + 4));
    }, 50);

    return () => window.clearInterval(id);
  }, [isSubmitting]);

  const onSubmit = async (data: ProfileSetupFormValues) => {
    setSetupError("");
    setIsSubmitting(true);
    setKeepModalOpen(true);

    const startTime = Date.now();

    try {
      await auth.completeProfileSetup({
        displayName: data.displayName,
        timezone: data.timezone,
        currency: data.currency,
      });

      setSetupProgress(100);
      setIsSubmitting(false);

      const elapsed = Date.now() - startTime;
      const remaining = Math.max(300, 500 - elapsed);
      await new Promise((resolve) => setTimeout(resolve, remaining));

      setKeepModalOpen(false);
    } catch {
      setIsSubmitting(false);
      setKeepModalOpen(false);
      setSetupError("Could not save profile yet. Please try again.");
    }
  };

  if (auth.isLoading || (!auth.requiresProfileSetup && !keepModalOpen)) {
    return null;
  }

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

        {(isSubmitting || setupProgress === 100) && (
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Setting up profile...
            </p>
            <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-200"
                style={{ width: `${setupProgress}%` }}
              />
            </div>
          </div>
        )}

        {setupError && (
          <p className="text-sm text-red-600 dark:text-red-400">{setupError}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting || setupProgress === 100}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold disabled:opacity-70"
        >
          {isSubmitting || setupProgress === 100 ? "Setting up profile..." : "Continue"}
        </button>
      </form>
    </div>
  );
}
