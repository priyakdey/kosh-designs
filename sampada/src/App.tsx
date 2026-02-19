import { RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster, toast } from "sonner";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { router } from "@/router";
import { ProfileSetupModal } from "@/components/forms/ProfileSetupModal";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
      throwOnError: false,
      queryFn: undefined,
    },
    mutations: {
      onError: () => {
        toast.error("Something went wrong. Please try again.");
      },
    },
  },
});

// Global query error handler
queryClient.getQueryCache().subscribe((event) => {
  if (event.type === "updated" && event.query.state.status === "error") {
    const err = event.query.state.error as { code?: string; message?: string } | null;
    const isTimeout = err?.code === "ECONNABORTED" || err?.message?.includes("timeout");
    toast.error(
      isTimeout
        ? "Request timed out. The server took too long to respond."
        : "Failed to load data. Please check your connection and try again.",
      { id: String(event.query.queryHash) },
    );
  }
});

function InnerApp() {
  const auth = useAuth();
  const showBootstrapOverlay = auth.isLoading;

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

      <ProfileSetupModal />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <InnerApp />
          <Toaster
            position="bottom-right"
            dir="ltr"
            richColors
            closeButton
            toastOptions={{
              duration: 3000,
              classNames: {
                error: "border border-red-200 dark:border-red-800",
              },
            }}
          />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
