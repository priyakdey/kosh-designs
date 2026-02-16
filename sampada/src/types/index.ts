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
}

export interface IncomeData {
  summary: IncomeSummary;
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
