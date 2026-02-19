import { useCreditCards } from "@/hooks/useCreditCards";
import { PageLoader } from "@/components/shared/PageLoader";
import { ServiceDownPage } from "@/components/shared/ServiceDownPage";
import { useUIStore } from "@/stores/uiStore";
import { formatCurrency } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PageHeader, FormModal, GradientButton } from "@/components/shared";
import { CreditCardVisual } from "@/components/credit-cards/CreditCardVisual";
import { AddCardForm } from "@/components/forms/AddCardForm";
import { AddBillForm } from "@/components/forms/AddBillForm";
import { PayBillForm } from "@/components/forms/PayBillForm";

const SEVERITY_DOT: Record<string, string> = {
  high: "bg-red-500",
  medium: "bg-amber-500",
  low: "bg-emerald-500",
};

const UTILIZATION_BAR: Record<string, string> = {
  high: "bg-red-500",
  medium: "bg-amber-500",
  low: "bg-emerald-500",
};

const UTILIZATION_TEXT: Record<string, string> = {
  high: "text-red-500",
  medium: "text-amber-500",
  low: "text-emerald-500",
};

function getUtilSeverity(percent: number): string {
  if (percent > 70) return "high";
  if (percent >= 30) return "medium";
  return "low";
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export function CreditCards() {
  const { data, isLoading, isError, refetch } = useCreditCards();
  const { activeModal, openModal, closeModal } = useUIStore();

  if (isError) return <ServiceDownPage onRetry={refetch} />;
  if (isLoading || !data) return <PageLoader />;

  const { summary, cards, utilization, timeline, recentActivity } = data;

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        title="Credit Cards"
        subtitle="Track balances, due dates, utilization, and payment risk in one place."
      >
        <button
          onClick={() => openModal("add-bill")}
          className="px-6 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all"
        >
          + Add Bill
        </button>
        <button
          onClick={() => openModal("pay-bill")}
          className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all"
        >
          Mark Bill As Paid
        </button>
        <GradientButton onClick={() => openModal("add-card")}>
          + Add Card
        </GradientButton>
      </PageHeader>

      {/* Outstanding Summary Banner */}
      <div className="mb-6 p-5 rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-orange-100 mb-1">Total Outstanding</p>
            <h2 className="text-4xl font-bold">
              {formatCurrency(summary.totalOutstanding)}
            </h2>
            <p className="text-sm text-orange-100 mt-2">
              Across {summary.activeCards} active cards
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <div>
              <p className="text-orange-100">Credit Limit</p>
              <p className="text-xl font-semibold">
                {formatCurrency(summary.totalCreditLimit)}
              </p>
            </div>
            <div>
              <p className="text-orange-100">Utilization</p>
              <p className="text-xl font-semibold">
                {summary.utilizationPercent}%
              </p>
            </div>
            <div>
              <p className="text-orange-100">Due in 7 days</p>
              <p className="text-xl font-semibold">
                {formatCurrency(summary.dueIn7Days)}
              </p>
            </div>
            <div>
              <p className="text-orange-100">Min Due</p>
              <p className="text-xl font-semibold">
                {formatCurrency(summary.minDue)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Utilization + Timeline Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Card Utilization */}
        <div className="xl:col-span-2 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Card Utilization</h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Keep each card below 30%
            </span>
          </div>
          <ScrollArea className="h-[168px] overflow-hidden">
            <div className="space-y-4 pr-3">
              {utilization.map((item) => {
                const severity = getUtilSeverity(item.percent);
                return (
                  <div key={item.cardId}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium">{item.label}</span>
                      <span className={UTILIZATION_TEXT[severity]}>
                        {item.percent}%
                      </span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${UTILIZATION_BAR[severity]}`}
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
          <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">
            High utilization can impact credit score. Consider paying down the
            red-zone card before statement generation.
          </div>
        </div>

        {/* Payment Timeline */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-lg font-semibold mb-4">Payment Timeline</h3>
          <ScrollArea className="h-[168px] overflow-hidden">
            <div className="space-y-4 text-sm pr-3">
              {timeline.map((entry) => (
                <div key={entry.cardId} className="flex items-start gap-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${SEVERITY_DOT[entry.severity]}`}
                  />
                  <div>
                    <p className="font-medium">{entry.date}</p>
                    <p className="text-gray-500 dark:text-gray-400">
                      {entry.label}:{" "}
                      <span className="text-gray-900 dark:text-gray-100 font-semibold">
                        {formatCurrency(entry.amount)}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Card Portfolio */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold">Card Portfolio</h3>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {cards.map((card) => (
            <CreditCardVisual
              key={card.id}
              card={card}
              onRemove={() => {
                // Placeholder - would call mutation in real app
              }}
            />
          ))}
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold">Recent Card Activity</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Last 5 high-value or risky transactions
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                  Card
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                  Merchant
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {recentActivity.map((activity) => (
                <tr
                  key={activity.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm">
                    {formatDate(activity.date)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    {activity.cardLabel}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {activity.merchant}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold">
                    {formatCurrency(activity.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <FormModal
        open={activeModal === "add-card"}
        onClose={closeModal}
        title="Add Credit Card"
        subtitle="Store only card metadata. Never store full card number or CVV."
      >
        <AddCardForm onSubmit={() => closeModal()} onCancel={closeModal} />
      </FormModal>

      <FormModal
        open={activeModal === "add-bill"}
        onClose={closeModal}
        title="Add Bill"
        subtitle="Track a new card bill entry."
      >
        <AddBillForm
          cards={cards}
          onSubmit={() => closeModal()}
          onCancel={closeModal}
        />
      </FormModal>

      <FormModal
        open={activeModal === "pay-bill"}
        onClose={closeModal}
        title="Mark Bill as Paid"
        subtitle="Record card bill payment status."
      >
        <PayBillForm
          cards={cards}
          onSubmit={() => closeModal()}
          onCancel={closeModal}
        />
      </FormModal>
    </div>
  );
}
