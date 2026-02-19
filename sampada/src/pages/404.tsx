import { Link, useNavigate } from "@tanstack/react-router";

export function NotFoundPage() {

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center gap-10">

      {/* Illustration */}
      <div className="relative">
        <h1 className="text-[120px] font-extrabold text-gray-100 dark:text-gray-800 select-none">
          404
        </h1>

        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            viewBox="0 0 240 120"
            className="w-72 h-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Line chart */}
            <path
              d="M10 90 L60 60 L100 70 L140 40 L180 50"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              className="text-indigo-500"
            />

            {/* Drop-off */}
            <path
              d="M180 50 L220 120"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              className="text-red-500"
            />

            {/* Floating dot */}
            <circle
              cx="220"
              cy="120"
              r="4"
              className="fill-red-500 animate-[bounce_1.2s_infinite]"
            />
          </svg>
        </div>
      </div>

      {/* Copy */}
      <div className="space-y-3 max-w-md">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          This page is off the balance sheet.
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          We couldn’t find what you were looking for.
          It may have been moved or never existed.
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate({ to: "/" })}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          Go back
        </button>

        <Link
          to="/"
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm font-semibold shadow hover:shadow-md hover:scale-105 transition-all"
        >
          Go to dashboard
        </Link>
      </div>
    </div>
  );
}
