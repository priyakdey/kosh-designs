interface RecurrenceFieldProps {
  isRecurring: boolean;
  onRecurringChange: (checked: boolean) => void;
  label: string;
  id: string;
}

export function RecurrenceField({
  isRecurring,
  onRecurringChange,
  label,
  id,
}: RecurrenceFieldProps) {
  return (
    <>
      <div className="flex items-center">
        <input
          id={id}
          type="checkbox"
          checked={isRecurring}
          onChange={(e) => onRecurringChange(e.target.checked)}
          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
        />
        <label htmlFor={id} className="ml-2 text-sm font-medium">
          {label}
        </label>
      </div>

      {isRecurring && (
        <div className="p-4 bg-purple-50 dark:bg-purple-900/10 rounded-lg border border-purple-200 dark:border-purple-800">
          <label className="block text-sm font-medium mb-2">
            Recurrence Pattern
          </label>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600 dark:text-gray-400">
                Every
              </label>
              <select className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>month</option>
                <option>week</option>
                <option>year</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                Starts ON
              </label>
              <input
                type="date"
                defaultValue="2026-02-10"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Preview: Every month starting Feb 10, 2026
          </p>
        </div>
      )}
    </>
  );
}
