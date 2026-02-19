import { useEffect, useState } from "react";

const MIN_MS = 700;

/**
 * Full-page loading state shown while a query is in-flight.
 * Runs for at least MIN_MS so the bar never flashes away instantly.
 */
export function PageLoader() {
  const [progress, setProgress] = useState(8);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const start = Date.now();

    // Fast ramp to ~70% then slow crawl toward 92%
    const ramp = setInterval(() => {
      setProgress((p) => {
        if (p < 70) return p + 6;
        if (p < 92) return p + 0.8;
        return p;
      });
    }, 120);

    return () => {
      clearInterval(ramp);
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_MS - elapsed);
      setTimeout(() => setVisible(false), remaining);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-6 px-8 bg-red-500">
      {/* Progress bar */}
      <div className="w-full max-w-sm">
        <div className="h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500 tracking-wide">
        Fetching data…
      </p>
    </div>
  );
}
