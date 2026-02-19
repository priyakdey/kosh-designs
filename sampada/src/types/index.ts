export interface User {
  id: string;
  name: string;
  email: string;
  initials: string;
  timezone: string;
  currency: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export type Theme = "light" | "dark";

export interface NavItem {
  label: string;
  path: string;
  icon: string;
  comingSoon?: boolean;
}

export interface NavSubItem {
  label: string;
  path: string;
  dotColor: string;
  comingSoon?: boolean;
}

export interface NavGroup {
  label: string;
  icon: string;
  items: NavSubItem[];
}

export interface IncomeEntry {
  id: string;
  date: string;
  source: string;
  description: string;
  amount: number;
  currency: string;
  recurring: string | null;
}

export interface IncomeAllocation {
  source: string;
  amount: number;
  percent: number;
  color: string;
}

export interface IncomeSummary {
  totalIncome: number;
  changePercent: number;
  totalEntries: number;
  recurringTotal: number;
  oneTimeTotal: number;
  sourcesCount: number;
}

export interface IncomeTrendPoint {
  month: string;
  amount: number;
}

export interface IncomeHighlights {
  topSource: string;
  topSourceAmount: number;
  topSourcePercent: number;
  bestMonth: string;
  bestMonthAmount: number;
  sixMonthAvg: number;
}

export interface IncomeData {
  summary: IncomeSummary;
  trend: IncomeTrendPoint[];
  highlights: IncomeHighlights;
  allocation: IncomeAllocation[];
  entries: IncomeEntry[];
  months: string[];
}

/* ------------------------------------------------------------------ */
/* Expenses                                                            */
/* ------------------------------------------------------------------ */

export interface ExpenseEntry {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  currency: string;
  recurring: string | null;
}

export interface ExpenseAllocation {
  category: string;
  amount: number;
  percent: number;
  color: string;
}

export interface ExpenseSummary {
  totalExpenses: number;
  changePercent: number;
  totalEntries: number;
}

export interface ExpenseData {
  summary: ExpenseSummary;
  allocation: ExpenseAllocation[];
  entries: ExpenseEntry[];
  months: string[];
}

/* ------------------------------------------------------------------ */
/* Mutual Funds                                                        */
/* ------------------------------------------------------------------ */

export interface MutualFundSummary {
  totalInvested: number;
  currentValue: number;
  totalReturns: number;
  totalReturnsPercent: number;
  todayChange: number;
  todayChangePercent: number;
}

export interface MutualFundHolding {
  id: string;
  name: string;
  category: string;
  type: string;
  invested: number;
  currentValue: number;
  returns: number;
  returnsPercent: number;
  broker: string;
}

export interface PortfolioGrowthPoint {
  date: string;
  invested: number;
  current: number;
}

export interface FundTypeAllocation {
  type: string;
  percent: number;
  color: string;
}

export interface SectorAllocation {
  sector: string;
  percent: number;
  color: string;
}

export interface MutualFundData {
  summary: MutualFundSummary;
  holdings: MutualFundHolding[];
  portfolioGrowth: PortfolioGrowthPoint[];
  fundTypeAllocation: FundTypeAllocation[];
  sectorAllocation: SectorAllocation[];
}

/* ------------------------------------------------------------------ */
/* Credit Cards                                                        */
/* ------------------------------------------------------------------ */

export interface CreditCard {
  id: string;
  bankName: string;
  cardVariant: string;
  network: string;
  last4: string;
  holderName: string;
  outstanding: number;
  creditLimit: number;
  dueDate: string;
  billingDate: string;
  themeId: string;
}

export interface CreditCardSummary {
  totalOutstanding: number;
  totalCreditLimit: number;
  utilizationPercent: number;
  activeCards: number;
  dueIn7Days: number;
  minDue: number;
}

export interface CreditCardUtilization {
  cardId: string;
  label: string;
  percent: number;
}

export interface PaymentTimelineEntry {
  cardId: string;
  date: string;
  label: string;
  amount: number;
  severity: "high" | "medium" | "low";
}

export interface CreditCardActivity {
  id: string;
  date: string;
  cardLabel: string;
  merchant: string;
  amount: number;
}

export interface CreditCardData {
  summary: CreditCardSummary;
  cards: CreditCard[];
  utilization: CreditCardUtilization[];
  timeline: PaymentTimelineEntry[];
  recentActivity: CreditCardActivity[];
}
