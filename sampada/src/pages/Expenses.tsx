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
import { useExpenses } from "@/hooks/useExpenses";
import { PageLoader } from "@/components/shared/PageLoader";
import { ServiceDownPage } from "@/components/shared/ServiceDownPage";
import { useUIStore } from "@/stores/uiStore";
import { formatCurrency } from "@/lib/utils";
import { InteractiveDonutChart } from "@/components/charts/InteractiveDonutChart";
import {
  PageHeader,
  PersonalFamilyTabs,
  FormModal,
  DataTableCard,
  CategoryBadge,
  MonthSelector,
  GradientButton,
  AppSelect,
} from "@/components/shared";
import { AddExpenseForm } from "@/components/forms/AddExpenseForm";

const CATEGORY_BADGE_COLORS: Record<string, string> = {
  Rent: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
  Food: "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300",
  Transport:
    "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
  Utilities:
    "bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300",
  Healthcare:
    "bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300",
  Shopping:
    "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300",
  Entertainment:
    "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300",
  Education:
    "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300",
  Insurance:
    "bg-sky-100 dark:bg-sky-900/30 text-sky-800 dark:text-sky-300",
  EMI: "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300",
  Others:
    "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300",
};

const RECURRING_BADGE_CLASS =
  "text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-2 py-1 rounded";

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
  return new Date(dateStr).toLocaleDateString("en-GB");
}

export function Expenses() {
  const { data, isLoading, isError, refetch } = useExpenses();
  const { activeModal, openModal, closeModal } = useUIStore();
  const modalOpen = activeModal === "add-expense";
  const [selectedMonth, setSelectedMonth] = useState("February 2026");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  if (isError) return <ServiceDownPage onRetry={refetch} />;
  if (isLoading || !data) return <PageLoader />;

  const { summary, allocation, entries, months } = data;
  const recurringTotal = entries
    .filter((entry) => !!entry.recurring)
    .reduce((sum, entry) => sum + entry.amount, 0);
  const variableTotal = Math.max(0, summary.totalExpenses - recurringTotal);
  const categoryCount = allocation.filter((item) => item.percent > 0).length;

  const topCategory = allocation.reduce((max, item) =>
    item.amount > max.amount ? item : max,
  );

  const lastMonthTotal = summary.totalExpenses / (1 + summary.changePercent / 100);
  const savedAmount = Math.max(0, lastMonthTotal - summary.totalExpenses);
  const trend = [
    { month: "Sep", amount: 55000 },
    { month: "Oct", amount: 52000 },
    { month: "Nov", amount: 49000 },
    { month: "Dec", amount: 47000 },
    { month: "Jan", amount: 44000 },
    { month: "Feb", amount: summary.totalExpenses },
  ];
  const sixMonthAvg =
    trend.reduce((sum, point) => sum + point.amount, 0) / trend.length;

  const totalEntries = entries.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / rowsPerPage));
  const startIdx = (currentPage - 1) * rowsPerPage;
  const pageEntries = entries.slice(startIdx, startIdx + rowsPerPage);

  return (
    <div>
      <PageHeader title="Expenditure" subtitle="Track and manage your expenses">
        <MonthSelector
          value={selectedMonth}
          onChange={setSelectedMonth}
          months={months}
        />
        <GradientButton
          onClick={() => openModal("add-expense")}
          className="h-10 min-w-44 inline-flex items-center justify-center"
        >
          + Add Expense
        </GradientButton>
      </PageHeader>

      <PersonalFamilyTabs />

      <div className="mb-6 p-5 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-red-100 text-sm mb-1">Total Expenses • Feb 2026</p>
            <div className="flex items-end gap-3">
              <h2 className="text-4xl font-bold">
                {formatCurrency(summary.totalExpenses)}
              </h2>
              <div className="flex items-center gap-1 mb-1 bg-white/20 px-2 py-0.5 rounded-full">
                <svg
                  className="w-3.5 h-3.5 text-green-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
                <span className="text-green-200 font-semibold text-sm">
                  {summary.changePercent.toFixed(1)}%
                </span>
                <span className="text-red-200 text-xs">vs last month</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="bg-white/15 rounded-xl px-4 py-2.5 text-center min-w-[90px]">
              <p className="text-xs text-red-100">Entries</p>
              <p className="text-xl font-bold">{summary.totalEntries}</p>
            </div>
            <div className="bg-white/15 rounded-xl px-4 py-2.5 text-center min-w-[90px]">
              <p className="text-xs text-red-100">Fixed</p>
              <p className="text-xl font-bold">{formatCompactCurrency(recurringTotal)}</p>
            </div>
            <div className="bg-white/15 rounded-xl px-4 py-2.5 text-center min-w-[90px]">
              <p className="text-xs text-red-100">Variable</p>
              <p className="text-xl font-bold">{formatCompactCurrency(variableTotal)}</p>
            </div>
            <div className="bg-white/15 rounded-xl px-4 py-2.5 text-center min-w-[90px]">
              <p className="text-xs text-red-100">Categories</p>
              <p className="text-xl font-bold">{categoryCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold">Expense Trend</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Last 6 months
              </p>
            </div>
          </div>
          <div className="flex-1 min-h-28">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend} margin={{ left: 8, right: 12 }}>
                <defs>
                  <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0.02} />
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
                <YAxis hide domain={["dataMin - 3000", "dataMax + 3000"]} />
                <Tooltip
                  formatter={(value: number | undefined) => [
                    formatCurrency(value ?? 0),
                    "Expense",
                  ]}
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
                  stroke="#ef4444"
                  strokeWidth={2.5}
                  fill="url(#expenseGrad)"
                  dot={{ r: 3, fill: "#ef4444" }}
                  activeDot={{ r: 4, fill: "#ef4444", stroke: "#fff", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-400 dark:text-gray-500">
            {trend.map((point, i) => (
              <span
                key={point.month}
                className={
                  i === trend.length - 1
                    ? "text-green-600 dark:text-green-400 font-semibold"
                    : i === 0
                      ? "text-red-500 font-semibold"
                      : undefined
                }
              >
                {formatCompactCurrency(point.amount)}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold">By Category</h3>
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
                name: item.category,
                amount: item.amount,
                percent: item.percent,
                color: item.color,
              }))}
              centerLabel={formatCompactCurrency(summary.totalExpenses)}
              centerSubLabel="Expenses"
            />
          </div>
        </div>

        <div className="lg:col-span-1 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 flex flex-col gap-3">
          <h3 className="text-sm font-semibold">Highlights</h3>
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30">
            <p className="text-xs text-gray-500 dark:text-gray-400">Top Category</p>
            <p className="text-sm font-semibold text-red-700 dark:text-red-400 mt-0.5">
              {topCategory.category}
            </p>
            <p className="text-xs text-gray-400">
              {formatCurrency(topCategory.amount)} • {topCategory.percent}%
            </p>
          </div>
          <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30">
            <p className="text-xs text-gray-500 dark:text-gray-400">vs Last Month</p>
            <p className="text-sm font-semibold text-green-700 dark:text-green-400 mt-0.5">
              Saved {formatCurrency(savedAmount)}
            </p>
            <p className="text-xs text-gray-400">
              Down from {formatCurrency(lastMonthTotal)}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30">
            <p className="text-xs text-gray-500 dark:text-gray-400">Last 6M Average</p>
            <p className="text-sm font-semibold text-amber-700 dark:text-amber-400 mt-0.5">
              {formatCurrency(sixMonthAvg)}
            </p>
            <p className="text-xs text-gray-400">Per month</p>
          </div>
        </div>
      </div>

      <DataTableCard
        title="Expense Entries"
        subtitle={`All expenses for ${selectedMonth}`}
        headerRight={
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
        }
      >
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Category
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
                    label={entry.category}
                    colorMap={CATEGORY_BADGE_COLORS}
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
                    <span className={RECURRING_BADGE_CLASS}>{entry.recurring}</span>
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 mr-3">
                    Edit
                  </button>
                  <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Showing {startIdx + 1}-{Math.min(startIdx + rowsPerPage, totalEntries)} of{" "}
            {totalEntries} entries
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
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${page === currentPage
                  ? "bg-purple-500 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
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
      </DataTableCard>

      <FormModal
        open={modalOpen}
        onClose={closeModal}
        title="Add Expense"
        subtitle="Record a new expense entry"
      >
        <AddExpenseForm onSubmit={() => closeModal()} onCancel={closeModal} />
      </FormModal>
    </div>
  );
}
