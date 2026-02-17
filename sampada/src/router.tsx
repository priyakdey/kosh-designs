import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  redirect,
  Outlet,
} from "@tanstack/react-router";
import { useAuth } from "@/contexts/AuthContext";
import { MainLayout } from "@/components/layout/MainLayout";
import { Landing } from "@/pages/Landing";
import { Dashboard } from "@/pages/Dashboard";
import { Income } from "@/pages/Income";
import { Expenses } from "@/pages/Expenses";
import { ProfileSettings } from "@/pages/ProfileSettings";
import { MutualFunds } from "@/pages/investments/MutualFunds";
import { Stocks } from "@/pages/investments/Stocks";
import { FixedDeposits } from "@/pages/investments/FixedDeposits";
import { RecurringDeposits } from "@/pages/investments/RecurringDeposits";
import { CreditCards } from "@/pages/liabilities/CreditCards";

interface RouterContext {
  auth: {
    isAuthenticated: boolean;
    isLoading: boolean;
  };
}

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: Outlet,
});

function HomePage() {
  const auth = useAuth();
  if (auth.isLoading) return null;
  if (auth.isAuthenticated) {
    return (
      <MainLayout>
        <Dashboard />
      </MainLayout>
    );
  }
  return <Landing />;
}

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const authenticatedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "authenticated",
  component: MainLayout,
  beforeLoad: ({ context }) => {
    if (context.auth.isLoading) {
      return;
    }

    if (!context.auth.isAuthenticated) {
      throw redirect({ to: "/" });
    }
  },
});

const incomeRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/income",
  component: Income,
});

const expensesRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/expenses",
  component: Expenses,
});

const profileSettingsRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/profile-settings",
  component: ProfileSettings,
});

const mutualFundsRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/investments/mutual-funds",
  component: MutualFunds,
});

const stocksRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/investments/stocks",
  component: Stocks,
});

const fixedDepositsRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/investments/fixed-deposits",
  component: FixedDeposits,
});

const recurringDepositsRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/investments/recurring-deposits",
  component: RecurringDeposits,
});

const creditCardsRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: "/liabilities/credit-cards",
  component: CreditCards,
});

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="text-center">
        <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Page not found
        </p>
      </div>
    </div>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  authenticatedRoute.addChildren([
    incomeRoute,
    expensesRoute,
    profileSettingsRoute,
    mutualFundsRoute,
    stocksRoute,
    fixedDepositsRoute,
    recurringDepositsRoute,
    creditCardsRoute,
  ]),
  notFoundRoute,
]);

export const router = createRouter({
  routeTree,
  context: {
    auth: {
      isAuthenticated: false,
      isLoading: true,
    },
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
