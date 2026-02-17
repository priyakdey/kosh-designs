import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/utils";

interface InteractiveDonutChartItem {
  name: string;
  amount: number;
  percent: number;
  color: string;
}

interface InteractiveDonutChartProps {
  data: InteractiveDonutChartItem[];
  centerLabel: string;
  centerSubLabel?: string;
}

interface LabelProps {
  cx?: number;
  cy?: number;
  midAngle?: number;
  outerRadius?: number;
  payload?: InteractiveDonutChartItem;
}

const RADIAN = Math.PI / 180;

function DonutTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: InteractiveDonutChartItem }>;
}) {
  if (!active || !payload?.length) return null;

  const item = payload[0].payload;
  return (
    <div className="bg-transparent p-0 text-black dark:text-white text-xs font-medium">
      {formatCurrency(item.amount)}
    </div>
  );
}

function SliceLabel({ cx, cy, midAngle, outerRadius, payload }: LabelProps) {
  if (
    cx === undefined ||
    cy === undefined ||
    midAngle === undefined ||
    outerRadius === undefined ||
    !payload
  ) {
    return null;
  }

  if (payload.percent < 6) return null;

  const radius = outerRadius + 16;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="currentColor"
      className="text-[11px] text-gray-600 dark:text-gray-300"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {payload.name}
    </text>
  );
}

export function InteractiveDonutChart({
  data,
  centerLabel,
  centerSubLabel = "Total",
}: InteractiveDonutChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const chartData = useMemo(
    () => data.filter((item) => item.percent > 0),
    [data],
  );

  return (
    <div className="h-full min-h-[300px]">
      <div className="h-full grid grid-cols-5 gap-3 items-stretch">
        <div className="col-span-3 h-full min-h-[300px] relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="amount"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={102}
                paddingAngle={2}
                activeIndex={activeIndex ?? undefined}
                activeOuterRadius={112}
                labelLine={false}
                label={(props) => <SliceLabel {...props} />}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={entry.color}
                    onMouseEnter={() => setActiveIndex(index)}
                    style={{
                      opacity:
                        activeIndex === null || activeIndex === index ? 1 : 0.25,
                      transition: "opacity 150ms ease",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </Pie>
              <Tooltip content={<DonutTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold">{centerLabel}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {centerSubLabel}
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-2 h-full min-h-[300px] flex flex-col justify-center">
          <div className="max-h-[280px] overflow-y-auto pr-1 space-y-2">
            {chartData.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-800 px-2 py-2 text-[11px]"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="truncate">{item.name}</span>
                </div>
                <span className="font-semibold flex-shrink-0">{item.percent}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
