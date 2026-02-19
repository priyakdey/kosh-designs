import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIncome } from "@/hooks/useIncome";
import { PageLoader } from "@/components/shared/PageLoader";
import { ServiceDownPage } from "@/components/shared/ServiceDownPage";
import { useUIStore } from "@/stores/uiStore";
import { formatCurrency } from "@/lib/utils";
import { InteractiveDonutChart } from "@/components/charts/InteractiveDonutChart";
import {
  PageHeader,
  PersonalFamilyTabs,
  FormModal,
  CategoryBadge,
  MonthSelector,
  AppSelect,
  GradientButton,
} from "@/components/shared";
import { AddIncomeForm } from "@/components/forms/AddIncomeForm";

const SOURCE_BADGE_COLORS: Record<string, string> = {
  Salary:
    "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
  Dividend:
    "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
  Rental:
    "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300",
  Interest:
    "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300",
  Freelance:
    "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300",
  Bonus:
    "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300",
  Other: "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300",
};

const RECURRING_BADGE_COLORS: Record<string, string> = {
  Salary: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
  Dividend: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  Rental: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
};

function formatCompactCurrency(value: number): string {
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }
  if (value >= 1000) {
    return `₹${(value / 1000).toFixed(0)}k`;
  }
  return `₹${value}`;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export function Income() {
  const { data, isLoading, isError, refetch } = useIncome();
  const { activeModal, openModal, closeModal } = useUIStore();
  const modalOpen = activeModal === "add-income";
  const [selectedMonth, setSelectedMonth] = useState("February 2026");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  if (isError) return <ServiceDownPage onRetry={refetch} />;
  if (isLoading || !data) return <PageLoader />;

  const { summary, trend, highlights, allocation, entries, months } = data;

  // Pagination
  const totalEntries = entries.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / rowsPerPage));
  const startIdx = (currentPage - 1) * rowsPerPage;
  const pageEntries = entries.slice(startIdx, startIdx + rowsPerPage);

  return (
    <div>
      <PageHeader title="Income" subtitle="Track and manage your income sources">
        <MonthSelector
          value={selectedMonth}
          onChange={setSelectedMonth}
          months={months}
        />
        <GradientButton
          onClick={() => openModal("add-income")}
          className="h-10 min-w-44 inline-flex items-center justify-center"
        >
          + Add Income
        </GradientButton>
      </PageHeader>

      <PersonalFamilyTabs />

      {/* Summary Banner */}
      <div className="mb-6 p-5 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-green-100 text-sm mb-1">
              Total Income &bull; Feb 2026
            </p>
            <div className="flex items-end gap-3">
              <h2 className="text-4xl font-bold">
                {formatCurrency(summary.totalIncome)}
              </h2>
              <div className="flex items-center gap-1 mb-1 bg-white/20 px-2 py-0.5 rounded-full">
                <svg
                  className="w-3.5 h-3.5 text-green-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
                <span className="text-green-100 font-semibold text-sm">
                  +{summary.changePercent}%
                </span>
                <span className="text-green-200 text-xs">vs last month</span>
              </div>
            </div>
          </div>
          {/* Stat pills */}
          <div className="flex flex-wrap gap-3">
            <div className="bg-white/15 rounded-xl px-4 py-2.5 text-center min-w-[90px]">
              <p className="text-xs text-green-100">Entries</p>
              <p className="text-xl font-bold">{summary.totalEntries}</p>
            </div>
            <div className="bg-white/15 rounded-xl px-4 py-2.5 text-center min-w-[90px]">
              <p className="text-xs text-green-100">Recurring</p>
              <p className="text-xl font-bold">
                {formatCompactCurrency(summary.recurringTotal)}
              </p>
            </div>
            <div className="bg-white/15 rounded-xl px-4 py-2.5 text-center min-w-[90px]">
              <p className="text-xs text-green-100">One-time</p>
              <p className="text-xl font-bold">
                {formatCompactCurrency(summary.oneTimeTotal)}
              </p>
            </div>
            <div className="bg-white/15 rounded-xl px-4 py-2.5 text-center min-w-[90px]">
              <p className="text-xs text-green-100">Sources</p>
              <p className="text-xl font-bold">{summary.sourcesCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Column Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        {/* Income Trend (2/5) */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold">Income Trend</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Last 6 months
              </p>
            </div>
          </div>
          <div className="flex-1 min-h-28">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend} margin={{ left: 8, right: 12 }}>
                <defs>
                  <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  interval={0}
                  padding={{ left: 8, right: 8 }}
                  axisLine={false}
                  tickLine={false}
                  tickMargin={8}
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                />
                <YAxis hide domain={["dataMin - 5000", "dataMax + 5000"]} />
                <Tooltip
                  formatter={(value: number | undefined) => [formatCurrency(value ?? 0), "Income"]}
                  contentStyle={{
                    backgroundColor: "rgba(0,0,0,0.8)",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fill="url(#incomeGrad)"
                  dot={{ r: 3, fill: "#10b981" }}
                  activeDot={{ r: 4, fill: "#10b981", stroke: "#fff", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          {/* Amount labels below chart */}
          <div className="flex justify-between mt-1 text-xs text-gray-400 dark:text-gray-500">
            {trend.map((point, i) => (
              <span
                key={point.month}
                className={
                  i === trend.length - 1
                    ? "text-green-600 dark:text-green-400 font-semibold"
                    : undefined
                }
              >
                {formatCompactCurrency(point.amount)}
              </span>
            ))}
          </div>
        </div>

        {/* By Source (2/5) */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold">By Source</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Your distribution
              </p>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Feb 2026
            </span>
          </div>
          <div className="flex-1 pt-2">
            <InteractiveDonutChart
              data={allocation.map((item) => ({
                name: item.source,
                amount: item.amount,
                percent: item.percent,
                color: item.color,
              }))}
              centerLabel={formatCompactCurrency(summary.totalIncome)}
              centerSubLabel="Income"
            />
          </div>
        </div>

        {/* Highlights (1/5) */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 flex flex-col justify-between gap-3">
          <h3 className="text-sm font-semibold">Highlights</h3>
          <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Top Source
            </p>
            <p className="text-sm font-semibold text-green-700 dark:text-green-400 mt-0.5">
              {highlights.topSource}
            </p>
            <p className="text-xs text-gray-400">
              {formatCurrency(highlights.topSourceAmount)} &bull;{" "}
              {highlights.topSourcePercent}%
            </p>
          </div>
          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Best Month
            </p>
            <p className="text-sm font-semibold text-blue-700 dark:text-blue-400 mt-0.5">
              {highlights.bestMonth}
            </p>
            <p className="text-xs text-gray-400">
              {formatCurrency(highlights.bestMonthAmount)}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/30">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Last 6M Average
            </p>
            <p className="text-sm font-semibold text-purple-700 dark:text-purple-400 mt-0.5">
              {formatCurrency(highlights.sixMonthAvg)}
            </p>
            <p className="text-xs text-gray-400">Per month</p>
          </div>
        </div>
      </div>

      {/* Income Table with Pagination */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold">Income Entries</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              All income for {selectedMonth}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Rows per page:
            </span>
            <AppSelect
              value={String(rowsPerPage)}
              onChange={(value) => {
                setRowsPerPage(Number(value));
                setCurrentPage(1);
              }}
              options={[
                { value: "5", label: "5" },
                { value: "10", label: "10" },
                { value: "20", label: "20" },
              ]}
              className="h-7 min-h-7 text-xs px-2 w-20"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Recurring
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {pageEntries.map((entry) => (
                <tr
                  key={entry.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {formatDate(entry.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <CategoryBadge
                      label={entry.source}
                      colorMap={SOURCE_BADGE_COLORS}
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {entry.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                    {formatCurrency(entry.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {entry.recurring ? (
                      <span
                        className={`text-xs px-2 py-1 rounded ${RECURRING_BADGE_COLORS[entry.source] ??
                          "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                          }`}
                      >
                        {entry.recurring}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">&mdash;</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 mr-3 font-medium">
                      Edit
                    </button>
                    <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 font-medium">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Showing {startIdx + 1}&ndash;
            {Math.min(startIdx + rowsPerPage, totalEntries)} of {totalEntries}{" "}
            entries
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={
                  page === currentPage
                    ? "w-8 h-8 rounded-lg bg-purple-600 text-white text-sm font-semibold"
                    : "w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-colors"
                }
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Add Income Modal */}
      <FormModal
        open={modalOpen}
        onClose={closeModal}
        title="Add Income"
        subtitle="Record a new income entry"
      >
        <AddIncomeForm
          onSubmit={() => closeModal()}
          onCancel={closeModal}
        />
      </FormModal>
    </div>
  );
}
