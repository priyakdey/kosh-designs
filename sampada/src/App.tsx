import { RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { router } from "@/router";
import { AppSelect } from "@/components/shared";

const queryClient = new QueryClient();
const TIMEZONE_OPTIONS = [
  { value: "Asia/Kolkata", label: "Asia/Kolkata (IST)" },
  { value: "America/New_York", label: "America/New_York (EST/EDT)" },
  { value: "America/Los_Angeles", label: "America/Los_Angeles (PST/PDT)" },
  { value: "Europe/London", label: "Europe/London (GMT/BST)" },
  { value: "Europe/Berlin", label: "Europe/Berlin (CET/CEST)" },
  { value: "Asia/Dubai", label: "Asia/Dubai (GST)" },
  { value: "Asia/Singapore", label: "Asia/Singapore (SGT)" },
];

const CURRENCY_OPTIONS = [
  { value: "INR", label: "INR - Indian Rupee" },
  { value: "USD", label: "USD - US Dollar" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "GBP", label: "GBP - British Pound" },
  { value: "AED", label: "AED - UAE Dirham" },
  { value: "SGD", label: "SGD - Singapore Dollar" },
];

function InnerApp() {
  const auth = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [timezone, setTimezone] = useState("");
  const [currency, setCurrency] = useState("");
  const [setupError, setSetupError] = useState("");
  const [setupProgress, setSetupProgress] = useState(0);
  const protectedPath = window.location.pathname !== "/";
  const showBootstrapOverlay = auth.isLoading && protectedPath;

  useEffect(() => {
    if (!auth.requiresProfileSetup) return;
    setDisplayName(auth.user?.name ?? "");
    setTimezone(auth.user?.timezone || "Asia/Kolkata");
    setCurrency(auth.user?.currency || "INR");
  }, [auth.requiresProfileSetup, auth.user]);

  useEffect(() => {
    if (!auth.isSettingUpProfile) {
      setSetupProgress(0);
      return;
    }

    const id = window.setInterval(() => {
      setSetupProgress((value) => Math.min(95, value + 4));
    }, 50);

    return () => window.clearInterval(id);
  }, [auth.isSettingUpProfile]);

  const handleProfileSetupSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setSetupError("");

    try {
      await auth.completeProfileSetup({ displayName, timezone, currency });
      setSetupProgress(100);
    } catch {
      setSetupError("Could not save profile yet. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className={showBootstrapOverlay ? "blur-sm pointer-events-none" : ""}>
        <RouterProvider
          router={router}
          context={{
            auth: {
              isAuthenticated: auth.isAuthenticated,
              isLoading: auth.isLoading,
            },
          }}
        />
      </div>

      {showBootstrapOverlay && (
        <div className="fixed inset-0 z-50 bg-gray-950/35 backdrop-blur-[1px] flex items-center justify-center px-6">
          <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white/90 dark:bg-gray-900/85 p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center animate-pulse">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  Preparing your dashboard
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Syncing profile and preferences
                </p>
              </div>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-200"
                style={{ width: `${auth.bootstrapProgress}%` }}
              />
            </div>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
              {Math.round(auth.bootstrapProgress)}%
            </p>
          </div>
        </div>
      )}

      {!auth.isLoading && auth.requiresProfileSetup && (
        <div className="fixed inset-0 z-[60] bg-gray-950/45 backdrop-blur-sm flex items-center justify-center px-6">
          <form
            onSubmit={handleProfileSetupSubmit}
            className="w-full max-w-lg rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-2xl space-y-5"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Quick Setup
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Complete your profile to personalize your dashboard.
              </p>
            </div>

            <label className="block space-y-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Display Name
              </span>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </label>

            <label className="block space-y-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Timezone
              </span>
              <AppSelect
                value={timezone}
                onChange={setTimezone}
                options={TIMEZONE_OPTIONS}
                placeholder="Select timezone"
                className="h-11"
              />
            </label>

            <label className="block space-y-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Currency
              </span>
              <AppSelect
                value={currency}
                onChange={setCurrency}
                options={CURRENCY_OPTIONS}
                placeholder="Select currency"
                className="h-11"
              />
            </label>

            {auth.isSettingUpProfile && (
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
              disabled={auth.isSettingUpProfile}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold disabled:opacity-70"
            >
              {auth.isSettingUpProfile ? "Setting up profile..." : "Continue"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <InnerApp />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
