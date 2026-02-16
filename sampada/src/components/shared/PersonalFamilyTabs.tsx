import { ComingSoonBadge } from "./ComingSoonBadge";

export function PersonalFamilyTabs() {
  return (
    <div className="mb-6 border-b border-gray-200 dark:border-gray-800">
      <div className="flex gap-4">
        <button className="px-4 py-2 border-b-2 border-purple-500 text-purple-600 dark:text-purple-400 font-semibold">
          Personal
        </button>
        <button
          className="px-4 py-2 border-b-2 border-transparent text-gray-400 dark:text-gray-600 font-semibold cursor-not-allowed"
          disabled
        >
          Family
          <span className="ml-2">
            <ComingSoonBadge />
          </span>
        </button>
      </div>
    </div>
  );
}
