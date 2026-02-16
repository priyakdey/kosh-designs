import type { ReactNode } from "react";

interface DataTableCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function DataTableCard({
  title,
  subtitle,
  children,
}: DataTableCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {subtitle}
        </p>
      </div>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}
