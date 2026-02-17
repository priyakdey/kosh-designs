import { useState } from "react";
import { DollarSign } from "lucide-react";
import { useIncome } from "@/hooks/useIncome";
import { useUIStore } from "@/stores/uiStore";
import { DonutChart } from "@/components/charts/DonutChart";
import { formatCurrency } from "@/lib/utils";
import {
  PageHeader,
  PersonalFamilyTabs,
  StatCard,
  WidgetCard,
  FormModal,
  DataTableCard,
  CategoryBadge,
  MonthSelector,
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
    "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300",
  Bonus:
    "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300",
  Other: "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300",
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
  const { data, isLoading } = useIncome();
  const { activeModal, openModal, closeModal } = useUIStore();
  const modalOpen = activeModal === "add-income";
  const [selectedMonth, setSelectedMonth] = useState("February 2026");

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  const { summary, allocation, entries, months } = data;

  const donutData = allocation.map((a) => ({
    name: a.source,
    value: a.amount,
    color: a.color,
    percent: a.percent,
  }));

  return (
    <div>
      <PageHeader title="Income" subtitle="Track and manage your income sources">
        <MonthSelector
          value={selectedMonth}
          onChange={setSelectedMonth}
          months={months}
        />
        <GradientButton onClick={() => openModal("add-income")}>
          + Add Income
        </GradientButton>
      </PageHeader>

      <PersonalFamilyTabs />

      {/* Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <StatCard
          title="Total Income"
          subtitle="Your personal income"
          icon={
            <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
          }
          iconBg="bg-green-100 dark:bg-green-900/20"
          value={summary.totalIncome}
          changePercent={summary.changePercent}
          trendDirection="up"
          footerLabel="Total Entries"
          footerValue={summary.totalEntries}
        />

        {/* Income by Source */}
        <WidgetCard>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Income by Source</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Your distribution
            </p>
          </div>
          <DonutChart
            data={donutData}
            centerLabel={formatCompactCurrency(summary.totalIncome)}
          />
        </WidgetCard>
      </div>

      {/* Income Table */}
      <DataTableCard
        title="Income Entries"
        subtitle={`All income for ${selectedMonth}`}
      >
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
            {entries.map((entry) => (
              <tr
                key={entry.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="font-medium">
                    {formatDate(entry.date)}
                  </span>
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
                    <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-2 py-1 rounded">
                      {entry.recurring}
                    </span>
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
      </DataTableCard>

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
