import type { ReactNode } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { WidgetCard } from "./WidgetCard";

interface StatCardProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  iconBg: string;
  value: number;
  changePercent: number;
  /** "up" means higher is good (income), "down" means lower is good (expenses) */
  trendDirection?: "up" | "down";
  changeLabel?: string;
  footerLabel: string;
  footerValue: string | number;
}

export function StatCard({
  title,
  subtitle,
  icon,
  iconBg,
  value,
  changePercent,
  trendDirection = "up",
  changeLabel = "vs last month",
  footerLabel,
  footerValue,
}: StatCardProps) {
  const isPositiveChange = changePercent > 0;
  const isGood =
    trendDirection === "up" ? isPositiveChange : !isPositiveChange;
  const trendClass = isGood ? "stat-up" : "stat-down";
  const TrendIcon = isPositiveChange ? ArrowUp : ArrowDown;
  const sign = isPositiveChange ? "+" : "";

  return (
    <WidgetCard>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {subtitle}
          </p>
        </div>
        <div className={`p-2 ${iconBg} rounded-lg`}>{icon}</div>
      </div>
      <div className="mb-3">
        <p className="text-4xl font-bold">{formatCurrency(value)}</p>
        <div className="flex items-center gap-1 mt-2">
          <TrendIcon className={`w-4 h-4 ${trendClass}`} />
          <span className={`text-sm ${trendClass} font-semibold`}>
            {sign}
            {changePercent}%
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {changeLabel}
          </span>
        </div>
      </div>
      <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            {footerLabel}
          </span>
          <span className="font-semibold">{footerValue}</span>
        </div>
      </div>
    </WidgetCard>
  );
}
