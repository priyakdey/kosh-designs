export function ServiceDownPage({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center gap-8">
      {/* SVG illustration */}
      <svg
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-72 h-auto"
        aria-hidden="true"
      >
        {/* Ground */}
        <ellipse cx="160" cy="200" rx="130" ry="10" fill="currentColor" className="text-gray-100 dark:text-gray-800" />

        {/* Server rack body */}
        <rect x="90" y="60" width="140" height="130" rx="8"
          fill="currentColor" className="text-gray-200 dark:text-gray-700" />
        <rect x="90" y="60" width="140" height="130" rx="8"
          stroke="currentColor" strokeWidth="1.5" className="text-gray-300 dark:text-gray-600" fill="none" />

        {/* Server slots */}
        {[80, 102, 124, 146, 168].map((y) => (
          <g key={y}>
            <rect x="102" y={y} width="116" height="16" rx="3"
              fill="currentColor" className="text-gray-100 dark:text-gray-800" />
            <rect x="106" y={y + 5} width="6" height="6" rx="1.5"
              fill="currentColor" className="text-gray-400 dark:text-gray-500" />
            {/* Status light - red for down */}
            <circle className="animate-pulse animate-[flicker_1.5s_infinite]"
              cx="208" cy={y + 8} r="3"
              fill="#ef4444" opacity="0.85" />
          </g>
        ))}

        {/* Broken plug cable - left */}
        <path d="M90 110 Q60 110 55 90 Q50 70 70 65"
          stroke="currentColor" strokeWidth="3" strokeLinecap="round"
          className="text-gray-400 dark:text-gray-500" fill="none" />
        <path d="M65 58 L70 65 M75 60 L70 65"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
          className="text-gray-400 dark:text-gray-500" />
        {/* Spark */}
        <path d="M62 62 L58 56 M66 58 L64 52 M70 60 L68 54"
          stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />

        {/* Warning triangle */}
        <g transform="translate(140, 18)">
          <path d="M20 4 L36 32 H4 Z"
            fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" strokeLinejoin="round" />
          <text x="20" y="26" textAnchor="middle"
            fontSize="14" fontWeight="bold" fill="#d97706">!</text>
        </g>

        {/* Floating dots (signal lost) */}
        <circle cx="252" cy="80" r="3" fill="#e5e7eb" className="dark:fill-gray-600" />
        <circle cx="264" cy="68" r="2" fill="#e5e7eb" className="dark:fill-gray-600" />
        <circle cx="258" cy="55" r="1.5" fill="#e5e7eb" className="dark:fill-gray-600" />
      </svg>

      {/* Message */}
      <div className="space-y-2 max-w-md">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Temporary liquidity issue!
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          Just kidding - our servers are down. Your data is full secure.
          Our team is working on a fix.
          <br></br>
          Please try again in a little while.
        </p>
      </div>

      {/* Reload button */}
      <button
        onClick={() => onRetry ? onRetry() : window.location.reload()}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm font-semibold shadow hover:shadow-md hover:scale-105 transition-all"
      >
        <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
          <path d="M13.5 8A5.5 5.5 0 1 1 8 2.5a5.48 5.48 0 0 1 3.89 1.61"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M11 1v3.5H14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Try again
      </button>
    </div>
  );
}
