import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { formatCurrency } from "@/lib/utils";

interface DonutChartItem {
  name: string;
  value: number;
  color: string;
  percent: number;
}

interface DonutChartProps {
  data: DonutChartItem[];
  centerLabel: string;
  centerSubLabel?: string;
}

export function DonutChart({
  data,
  centerLabel,
  centerSubLabel = "Total",
}: DonutChartProps) {
  return (
    <div>
      <div className="flex items-center justify-center mb-4">
        <div className="relative w-40 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={65}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold">{centerLabel}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {centerSubLabel}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2 text-sm">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span>{item.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">
                {formatCurrency(item.value)}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                {item.percent}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
