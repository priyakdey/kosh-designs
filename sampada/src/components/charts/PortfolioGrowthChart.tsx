import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { formatCurrency } from "@/lib/utils";
import type { PortfolioGrowthPoint } from "@/types";

interface PortfolioGrowthChartProps {
  data: PortfolioGrowthPoint[];
}

function formatYAxis(value: number): string {
  if (value >= 100000) return `₹${(value / 100000).toFixed(0)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}k`;
  return `₹${value}`;
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string; color: string }>;
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;

  const invested = payload.find((p) => p.dataKey === "invested")?.value ?? 0;
  const current = payload.find((p) => p.dataKey === "current")?.value ?? 0;
  const gain = current - invested;
  const gainPercent = invested > 0 ? ((gain / invested) * 100).toFixed(1) : "0";
  const isPositive = gain >= 0;

  return (
    <div className="bg-gray-900 dark:bg-gray-800 text-white rounded-lg shadow-lg p-3">
      <p className="text-xs font-semibold mb-2">{label}</p>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-blue-500" />
          <span className="text-xs">
            Invested: <span className="font-semibold">{formatCurrency(invested)}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-green-500" />
          <span className="text-xs">
            Current: <span className="font-semibold">{formatCurrency(current)}</span>
          </span>
        </div>
        <div className="border-t border-gray-700 dark:border-gray-600 mt-1 pt-1">
          <span className={`text-xs font-semibold ${isPositive ? "stat-up" : "stat-down"}`}>
            {isPositive ? "+" : ""}
            {formatCurrency(gain)} ({isPositive ? "+" : ""}
            {gainPercent}%)
          </span>
        </div>
      </div>
    </div>
  );
}

export function PortfolioGrowthChart({ data }: PortfolioGrowthChartProps) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(107,114,128,0.2)" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12, fill: "#9ca3af" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={formatYAxis}
          tick={{ fontSize: 12, fill: "#9ca3af" }}
          axisLine={false}
          tickLine={false}
          width={50}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          iconType="plainline"
          formatter={(value: string) => (
            <span className="text-sm text-gray-600 dark:text-gray-400">{value}</span>
          )}
        />
        <Line
          type="monotone"
          dataKey="invested"
          name="Total Invested"
          stroke="#3b82f6"
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 5, fill: "#3b82f6" }}
        />
        <Line
          type="monotone"
          dataKey="current"
          name="Current Value"
          stroke="#10b981"
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 5, fill: "#10b981" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
