import type { SectorAllocation } from "@/types";

interface SectorAllocationChartProps {
  data: SectorAllocation[];
}

export function SectorAllocationChart({ data }: SectorAllocationChartProps) {
  return (
    <div className="space-y-3">
      {data.map((sector) => (
        <div key={sector.sector}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-700 dark:text-gray-300">
              {sector.sector}
            </span>
            <span className="font-semibold">{sector.percent}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="h-2 rounded-full"
              style={{
                width: `${sector.percent}%`,
                backgroundColor: sector.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
