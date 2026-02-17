import { Link, useLocation } from "@tanstack/react-router";
import {
  Home,
  DollarSign,
  Wallet,
  TrendingUp,
  Calculator,
  Target,
  BarChart3,
  PanelLeftClose,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useUIStore } from "@/stores/uiStore";
import { ComingSoonBadge } from "@/components/shared/ComingSoonBadge";

export function Sidebar() {
  const collapsed = useUIStore((s) => s.sidebarCollapsed);
  const onToggle = useUIStore((s) => s.toggleSidebar);
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 sidebar-transition z-30 flex flex-col",
        collapsed ? "w-[4.5rem]" : "w-[18rem]",
      )}
    >
      {/* Logo Header */}
      <div
        className={cn(
          "border-b border-gray-200 dark:border-gray-800 flex items-center shrink-0",
          collapsed ? "justify-center px-2 py-4" : "justify-between px-4 py-4",
        )}
      >
        {collapsed ? (
          <button
            onClick={onToggle}
            className="bg-gradient-to-br from-purple-500 to-indigo-600 p-2 rounded-lg text-white hover:shadow-lg transition-shadow"
            aria-label="Expand sidebar"
          >
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
          </button>
        ) : (
          <>
            <div className="flex items-center gap-2.5">
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-2 rounded-lg text-white">
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
              <span className="text-xl font-bold gradient-text">Sampada</span>
            </div>
            <button
              onClick={onToggle}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Collapse sidebar"
            >
              <PanelLeftClose className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Navigation */}
      <nav
        className={cn(
          "flex-1 overflow-y-auto overflow-x-hidden",
          collapsed ? "px-2 py-4" : "px-3 py-4",
        )}
      >
        <div className="space-y-1">
          {/* Dashboard */}
          <NavLink
            to="/"
            icon={<Home className="w-5 h-5" />}
            label="Dashboard"
            active={isActive("/")}
            collapsed={collapsed}
          />

          {/* Income */}
          <NavLink
            to="/income"
            icon={<DollarSign className="w-5 h-5" />}
            label="Income"
            active={isActive("/income")}
            collapsed={collapsed}
          />

          {/* Expenses */}
          <NavLink
            to="/expenses"
            icon={<Wallet className="w-5 h-5" />}
            label="Expenses"
            active={isActive("/expenses")}
            collapsed={collapsed}
          />

          {/* Investments Section */}
          <div className="pt-3">
            <div
              className={cn(
                "flex items-center text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1",
                collapsed ? "justify-center px-0 py-1" : "px-3 py-1",
              )}
            >
              {collapsed ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <span>Investments</span>
              )}
            </div>

            <div className={cn("space-y-0.5", !collapsed && "ml-0")}>
              <SubNavLink
                to="/investments/mutual-funds"
                label="Mutual Funds"
                dotColor="bg-purple-500"
                active={isActive("/investments/mutual-funds")}
                collapsed={collapsed}
              />
              <SubNavLink
                to="/investments/stocks"
                label="Stocks"
                dotColor="bg-indigo-500"
                active={isActive("/investments/stocks")}
                collapsed={collapsed}
              />
              <SubNavLink
                label="SGB"
                dotColor="bg-yellow-500"
                collapsed={collapsed}
                comingSoon
              />
              <SubNavLink
                label="PPF"
                dotColor="bg-blue-500"
                collapsed={collapsed}
                comingSoon
              />
              <SubNavLink
                to="/investments/fixed-deposits"
                label="Fixed Deposits"
                dotColor="bg-cyan-500"
                active={isActive("/investments/fixed-deposits")}
                collapsed={collapsed}
              />
              <SubNavLink
                to="/investments/recurring-deposits"
                label="Recurring Deposits"
                dotColor="bg-sky-500"
                active={isActive("/investments/recurring-deposits")}
                collapsed={collapsed}
              />
              <SubNavLink
                label="NPS"
                dotColor="bg-teal-500"
                collapsed={collapsed}
                comingSoon
              />
            </div>
          </div>

          {/* Liabilities Section */}
          <div className="pt-3">
            <div
              className={cn(
                "flex items-center text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1",
                collapsed ? "justify-center px-0 py-1" : "px-3 py-1",
              )}
            >
              {collapsed ? (
                <Calculator className="w-4 h-4" />
              ) : (
                <span>Liabilities</span>
              )}
            </div>

            <div className="space-y-0.5">
              <SubNavLink
                to="/liabilities/credit-cards"
                label="Credit Cards"
                dotColor="bg-orange-500"
                active={isActive("/liabilities/credit-cards")}
                collapsed={collapsed}
              />
              <SubNavLink
                label="Loans"
                dotColor="bg-red-500"
                collapsed={collapsed}
                comingSoon
              />
            </div>
          </div>

          {/* Divider */}
          <div className="pt-3">
            <div className="border-t border-gray-200 dark:border-gray-800 mb-3" />
            <NavLink
              icon={<Target className="w-5 h-5" />}
              label="Goals"
              collapsed={collapsed}
              comingSoon
            />
            <NavLink
              icon={<BarChart3 className="w-5 h-5" />}
              label="Reports"
              collapsed={collapsed}
              comingSoon
            />
          </div>
        </div>
      </nav>

      {/* Profile Footer */}
      <div
        className={cn(
          "border-t border-gray-200 dark:border-gray-800 shrink-0",
          collapsed ? "p-2" : "p-3",
        )}
      >
        <Link
          to="/profile-settings"
          className={cn(
            "flex items-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
            collapsed ? "justify-center p-2" : "gap-3 px-3 py-2.5",
          )}
        >
          <div
            className={cn(
              "rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-semibold shrink-0",
              collapsed ? "w-9 h-9 text-sm" : "w-10 h-10",
            )}
          >
            {user?.initials ?? "U"}
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">
                  {user?.name ?? "User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  View Settings
                </p>
              </div>
              <Settings className="w-4 h-4 text-gray-400 shrink-0" />
            </>
          )}
        </Link>
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------------ */

function NavLink({
  to,
  icon,
  label,
  active,
  collapsed,
  comingSoon,
}: {
  to?: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  collapsed: boolean;
  comingSoon?: boolean;
}) {
  const baseClasses = cn(
    "nav-item flex items-center rounded-lg transition-colors",
    collapsed
      ? "justify-center w-full px-0 py-2.5"
      : "gap-3 px-3 py-2",
  );

  if (comingSoon || !to) {
    return (
      <div
        className={cn(
          baseClasses,
          "opacity-40 cursor-not-allowed pointer-events-none",
        )}
        title={collapsed ? `${label} (Coming Soon)` : undefined}
      >
        <span className="shrink-0">{icon}</span>
        {!collapsed && (
          <span className="flex items-center gap-2 text-sm">
            {label}
            <ComingSoonBadge />
          </span>
        )}
      </div>
    );
  }

  return (
    <Link
      to={to}
      className={cn(baseClasses, active && "active")}
      title={collapsed ? label : undefined}
    >
      <span className="shrink-0">{icon}</span>
      {!collapsed && <span className="text-sm">{label}</span>}
    </Link>
  );
}

/* ------------------------------------------------------------------ */

function SubNavLink({
  to,
  label,
  dotColor,
  active,
  collapsed,
  comingSoon,
}: {
  to?: string;
  label: string;
  dotColor: string;
  active?: boolean;
  collapsed: boolean;
  comingSoon?: boolean;
}) {
  const baseClasses = cn(
    "nav-item flex items-center rounded-lg transition-colors",
    collapsed
      ? "justify-center w-full px-0 py-2"
      : "gap-3 px-3 py-1.5 ml-3",
  );

  if (comingSoon || !to) {
    if (collapsed) return null; // hide coming-soon sub-items when collapsed
    return (
      <div
        className={cn(
          baseClasses,
          "opacity-40 cursor-not-allowed pointer-events-none",
        )}
      >
        <span className={cn("w-2 h-2 rounded-full shrink-0", dotColor)} />
        <span className="flex items-center gap-2 text-sm">
          {label}
          <ComingSoonBadge />
        </span>
      </div>
    );
  }

  if (collapsed) {
    return (
      <Link
        to={to}
        className={cn(baseClasses, active && "active")}
        title={label}
      >
        <span className={cn("w-2.5 h-2.5 rounded-full shrink-0", dotColor)} />
      </Link>
    );
  }

  return (
    <Link to={to} className={cn(baseClasses, active && "active")}>
      <span className={cn("w-2 h-2 rounded-full shrink-0", dotColor)} />
      <span className="text-sm">{label}</span>
    </Link>
  );
}
