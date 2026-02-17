import { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { useMutualFunds } from "@/hooks/useMutualFunds";
import { DonutChart } from "@/components/charts/DonutChart";
import { PortfolioGrowthChart } from "@/components/charts/PortfolioGrowthChart";
import { SectorAllocationChart } from "@/components/charts/SectorAllocationChart";
import { formatCurrency } from "@/lib/utils";
import {
  PageHeader,
  PersonalFamilyTabs,
  WidgetCard,
  FormModal,
  DataTableCard,
  AppSelect,
  GradientButton,
} from "@/components/shared";
import { AddMutualFundTransactionForm } from "@/components/forms/AddMutualFundTransactionForm";

function formatCompactCurrency(value: number): string {
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}k`;
  return `₹${value}`;
}

export function MutualFunds() {
  const { data, isLoading } = useMutualFunds();
  const [modalOpen, setModalOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState("5");

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  const {
    summary,
    holdings,
    portfolioGrowth,
    fundTypeAllocation,
    sectorAllocation,
  } = data;

  const donutData = fundTypeAllocation.map((a) => ({
    name: a.type,
    value: a.percent,
    color: a.color,
    percent: a.percent,
  }));

  return (
    <div>
      <PageHeader
        title="Mutual Funds"
        subtitle="Track your mutual fund portfolio"
      >
        <GradientButton
          onClick={() => setModalOpen(true)}
          className="h-10 min-w-44 inline-flex items-center justify-center"
        >
          + Add Transaction
        </GradientButton>
      </PageHeader>

      <PersonalFamilyTabs />

      {/* Performance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <WidgetCard>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Invested
            </p>
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <DollarSign className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-2xl font-bold">
            {formatCurrency(summary.totalInvested)}
          </p>
        </WidgetCard>

        <WidgetCard>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Current Value
            </p>
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <p className="text-2xl font-bold">
            {formatCurrency(summary.currentValue)}
          </p>
        </WidgetCard>

        <WidgetCard>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Returns
            </p>
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <ArrowUpRight className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <p className="text-2xl font-bold stat-up">
            +{formatCurrency(summary.totalReturns)}
          </p>
          <p className="text-sm stat-up font-semibold mt-1">
            +{summary.totalReturnsPercent}%
          </p>
        </WidgetCard>

        <WidgetCard>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Today's Change
            </p>
            <div className="p-2 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
              <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <p className="text-2xl font-bold stat-up">
            +{formatCurrency(summary.todayChange)}
          </p>
          <p className="text-sm stat-up font-semibold mt-1">
            +{summary.todayChangePercent}%
          </p>
        </WidgetCard>
      </div>

      {/* Allocation Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Fund Type Allocation */}
        <WidgetCard>
          <h3 className="text-lg font-semibold mb-4">Fund Type Allocation</h3>
          <DonutChart
            data={donutData}
            centerLabel={formatCompactCurrency(summary.currentValue)}
          />
        </WidgetCard>

        {/* Sector Allocation */}
        <WidgetCard>
          <h3 className="text-lg font-semibold mb-4">Sector Allocation</h3>
          <SectorAllocationChart data={sectorAllocation} />
        </WidgetCard>
      </div>

      {/* Portfolio Growth Chart */}
      <WidgetCard className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Portfolio Growth</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Invested vs Current Value over time
            </p>
          </div>
          <div className="flex items-center gap-2">
            {["1M", "6M", "1Y", "All"].map((period) => (
              <button
                key={period}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  period === "All"
                    ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-semibold"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        <PortfolioGrowthChart data={portfolioGrowth} />
      </WidgetCard>

      {/* Holdings Table */}
      <DataTableCard
        title="Holdings"
        subtitle="Your mutual fund portfolio"
      >
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Fund Name
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Invested
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Current Value
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Returns
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Broker
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {holdings.map((h) => (
              <tr
                key={h.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium">{h.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {h.category} &bull; {h.type}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap text-sm">
                  {formatCurrency(h.invested)}
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap text-sm font-semibold">
                  {formatCurrency(h.currentValue)}
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <div
                    className={`text-sm font-semibold ${h.returns >= 0 ? "stat-up" : "stat-down"}`}
                  >
                    {h.returns >= 0 ? "+" : ""}
                    {formatCurrency(h.returns)}
                  </div>
                  <div
                    className={`text-xs ${h.returns >= 0 ? "stat-up" : "stat-down"}`}
                  >
                    {h.returns >= 0 ? "+" : ""}
                    {h.returnsPercent}%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {h.broker}
                  </span>
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap text-sm">
                  <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 mr-2">
                    View
                  </button>
                  <button className="text-purple-600 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-300">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Rows per page:
            </span>
            <AppSelect
              value={rowsPerPage}
              onChange={setRowsPerPage}
              options={[
                { value: "5", label: "5" },
                { value: "10", label: "10" },
                { value: "20", label: "20" },
              ]}
              className="h-8 text-sm w-20"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Showing 1-{holdings.length} of {holdings.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              disabled
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button className="px-3 py-1.5 rounded-lg text-sm font-medium bg-purple-500 text-white">
              1
            </button>
            <button
              className="px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              disabled
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </DataTableCard>

      {/* Add Transaction Modal */}
      <FormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Transaction"
        subtitle="Record your mutual fund transaction"
      >
        <AddMutualFundTransactionForm
          onSubmit={() => setModalOpen(false)}
          onCancel={() => setModalOpen(false)}
        />
      </FormModal>
    </div>
  );
}
