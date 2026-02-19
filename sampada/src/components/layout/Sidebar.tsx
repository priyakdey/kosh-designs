import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Home,
  TrendingUp,
  ChartArea,
  PiggyBank,
  RefreshCw,
  ShieldCheck,
  CreditCard,
  Banknote,
  Calculator,
  Target,
  BarChart3,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  BanknoteArrowUp,
  BanknoteArrowDown,
  Vault,
  ChartNoAxesCombined,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useUIStore } from "@/stores/uiStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ComingSoonBadge } from "@/components/shared/ComingSoonBadge";

function GoldJarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Lid */}
      <rect x="4.5" y="1.5" width="7" height="1.4" rx="0.4" fill="currentColor" fillOpacity="0.55" />
      {/* Lid rim */}
      <rect x="4" y="2.75" width="8" height="0.75" rx="0.3" fill="currentColor" fillOpacity="0.35" />
      {/* Jar body */}
      <path d="M4.5 3.5C3.2 3.5 2.5 4.2 2.5 5V12.5C2.5 13.3 3.2 14 4.5 14H11.5C12.8 14 13.5 13.3 13.5 12.5V5C13.5 4.2 12.8 3.5 11.5 3.5Z"
        fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="0.85" strokeOpacity="0.75" />
      {/* Jar shine */}
      <path d="M4.1 5.5Q3.9 7.5 4.1 10" stroke="currentColor" strokeOpacity="0.22" strokeWidth="0.75" strokeLinecap="round" />
      {/* Coin outer ring */}
      <circle cx="8" cy="9" r="2.75" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="0.85" strokeOpacity="0.9" />
      {/* Coin inner ring */}
      <circle cx="8" cy="9" r="1.6" fill="none" stroke="currentColor" strokeWidth="0.55" strokeOpacity="0.45" />
      {/* Coin centre */}
      <circle cx="8" cy="9" r="0.45" fill="currentColor" fillOpacity="0.65" />
    </svg>
  );
}

export function Sidebar() {
  const collapsed = useUIStore((s) => s.sidebarCollapsed);
  const onToggle = useUIStore((s) => s.toggleSidebar);
  const location = useLocation();
  const { user } = useAuth();
  const [logoHovered, setLogoHovered] = useState(false);

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
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
            className="bg-gradient-to-br from-purple-500 to-indigo-600 p-2 rounded-lg text-white hover:shadow-lg transition-shadow relative w-10 h-10 flex items-center justify-center overflow-hidden"
            aria-label="Expand sidebar"
          >
            {/* Sampada logo - fades out on hover */}
            <motion.span
              className="absolute inset-0 flex items-center justify-center"
              animate={{ opacity: logoHovered ? 0 : 1, scale: logoHovered ? 0.7 : 1 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </motion.span>
            {/* PanelLeftOpen - fades in on hover */}
            <motion.span
              className="absolute inset-0 flex items-center justify-center"
              animate={{ opacity: logoHovered ? 1 : 0, scale: logoHovered ? 1 : 0.7 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <PanelLeftOpen className="w-5 h-5" />
            </motion.span>
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
      <ScrollArea className="flex-1 overflow-hidden">
        <nav
          className={cn(
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
              icon={<BanknoteArrowUp className="w-5 h-5" />}
              label="Income"
              active={isActive("/income")}
              collapsed={collapsed}
            />

            {/* Expenses */}
            <NavLink
              to="/expenses"
              icon={<BanknoteArrowDown className="w-5 h-5" />}
              label="Expenses"
              active={isActive("/expenses")}
              collapsed={collapsed}
            />

            {/* Investments Section */}
            <div className="pt-3">
              <div className="border-t border-gray-200 dark:border-gray-800 mb-3" />
              <div
                className={cn(
                  "flex items-center text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1",
                  collapsed ? "justify-center px-0 py-1" : "px-3 py-1",
                )}
              >
                {collapsed ? (
                  <ChartArea className="w-4 h-4" />
                ) : (
                  <span>Investments</span>
                )}
              </div>

              <div className={cn("space-y-0.5", !collapsed && "ml-0")}>
                <SubNavLink
                  to="/investments/mutual-funds"
                  label="Mutual Funds"
                  icon={<ChartNoAxesCombined className="w-4 h-4" />}
                  active={isActive("/investments/mutual-funds")}
                  collapsed={collapsed}
                />
                <SubNavLink
                  to="/investments/stocks"
                  label="Stocks"
                  icon={<TrendingUp className="w-4 h-4" />}
                  active={isActive("/investments/stocks")}
                  collapsed={collapsed}
                />
                <SubNavLink
                  label="SGB"
                  icon={<GoldJarIcon className="w-4 h-4" />}
                  collapsed={collapsed}
                  comingSoon
                />
                <SubNavLink
                  label="PPF"
                  icon={<PiggyBank className="w-4 h-4" />}
                  collapsed={collapsed}
                  comingSoon
                />
                <SubNavLink
                  to="/investments/fixed-deposits"
                  label="Fixed Deposits"
                  icon={<Vault className="w-4 h-4" />}
                  active={isActive("/investments/fixed-deposits")}
                  collapsed={collapsed}
                />
                <SubNavLink
                  to="/investments/recurring-deposits"
                  label="Recurring Deposits"
                  icon={<RefreshCw className="w-4 h-4" />}
                  active={isActive("/investments/recurring-deposits")}
                  collapsed={collapsed}
                />
                <SubNavLink
                  label="NPS"
                  icon={<ShieldCheck className="w-4 h-4" />}
                  collapsed={collapsed}
                  comingSoon
                />
              </div>
            </div>

            {/* Liabilities Section */}
            <div className="pt-3">
              <div className="border-t border-gray-200 dark:border-gray-800 mb-3" />
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
                  icon={<CreditCard className="w-4 h-4" />}
                  active={isActive("/liabilities/credit-cards")}
                  collapsed={collapsed}
                />
                <SubNavLink
                  label="Loans"
                  icon={<Banknote className="w-4 h-4" />}
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
      </ScrollArea>

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
  icon,
  active,
  collapsed,
  comingSoon,
}: {
  to?: string;
  label: string;
  icon: React.ReactNode;
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
