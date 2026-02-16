interface CategoryBadgeProps {
  label: string;
  colorMap: Record<string, string>;
  fallback?: string;
}

const DEFAULT_FALLBACK =
  "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300";

export function CategoryBadge({
  label,
  colorMap,
  fallback = DEFAULT_FALLBACK,
}: CategoryBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorMap[label] ?? fallback}`}
    >
      {label}
    </span>
  );
}
