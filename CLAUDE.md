# Sampada - Personal Finance Management SPA

## Project Overview
Sampada is a comprehensive personal finance management application tailored for Indian investment products and banking systems. Built as a React SPA with TypeScript, it tracks income, expenses, investments (mutual funds, stocks, FDs, RDs, SGB, PPF, NPS), liabilities (credit cards, loans), and financial goals.

## Tech Stack Requirements

### Core
- **React 18** + **TypeScript**
- **Vite** (build tool)
- **pnpm** (package manager)

### UI/Styling
- **TailwindCSS** (utility-first CSS)
- **shadcn/ui** (component library)
- **Framer Motion** (animations & transitions)
- **Lucide React** (icons)

### Routing & Data
- **TanStack Router** (type-safe routing)
- **TanStack Query** (data fetching, caching)
- **Axios** (HTTP client)

### Charts
- **Recharts** (for all charts: line, area, donut, bar)

### State Management
- **React Context** (Auth + Theme)
- **Zustand** (dynamic UI state)
- **TanStack Query** for server state
- **react-hook-form** + **zod** (form state & validation)

### Forms
- **react-hook-form** (form state management)
- **zod** + **@hookform/resolvers** (schema validation)
- **shadcn/ui Form** (form field primitives with error display)

## State Management Architecture

| Layer | Technology | What it manages |
|-------|-----------|----------------|
| **Auth** | React Context (`AuthContext`) | User session, login/logout, cookie, isLoading |
| **Theme** | React Context (`ThemeContext`) | Theme toggle, dark mode, localStorage sync |
| **Server State** | TanStack Query | API data fetching, caching, mutations |
| **UI State** | Zustand (`src/stores/`) | Sidebar collapse, modal coordination, filters, chart ranges |
| **Form State** | react-hook-form + zod | Field values, validation, dirty/touched tracking |

### Rules
- **React Context** = cross-app environment state (auth, theme, currency, timezone). Provided via `<Provider>` wrappers.
- **Zustand** = dynamic UI / feature state only (filters, selected items, UI coordination). Feature-scoped stores in `src/stores/`. Never auth, theme, or server data.
- **TanStack Query** = all server state. Never store API data in Zustand or Context.
- **react-hook-form** = all form state. Never use raw `useState` for form fields.

### Zustand Store Guidelines
- One store per feature domain (e.g., `useUIStore.ts`, `useDashboardStore.ts`)
- Each store must be small with a clear single purpose
- Never mix unrelated domains in one store
- Persist only what's needed (use `partialize`)

### Form Pattern
All forms use: **shadcn Form** + **react-hook-form** + **zod**

```
src/schemas/        → Zod schemas (validation + types)
src/components/forms/ → Form components (UI + hook wiring)
```

Each form:
1. Zod schema in `src/schemas/<domain>Schema.ts` — single source of truth for validation + inferred types
2. Form component in `src/components/forms/` — uses `useForm()` + `zodResolver` + shadcn `<Form>` / `<FormField>` / `<FormItem>` / `<FormLabel>` / `<FormControl>` / `<FormMessage>`
3. Page renders form inside `<FormModal>` and passes `onSubmit` + `onCancel` callbacks

## Logo SVG
```svg
<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
</svg>
```

## Project Structure
```
sampada/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn components (Button, Card, etc.)
│   │   ├── layout/          # Sidebar, Header, Footer
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   └── MainLayout.tsx
│   │   ├── charts/          # Reusable chart components
│   │   │   ├── LineChart.tsx
│   │   │   ├── AreaChart.tsx
│   │   │   ├── DonutChart.tsx
│   │   │   └── BarChart.tsx
│   │   ├── widgets/         # Dashboard widgets
│   │   │   ├── CashFlowWidget.tsx
│   │   │   ├── NetWorthWidget.tsx
│   │   │   ├── ExpenseBreakdownWidget.tsx
│   │   │   └── InvestmentAllocationWidget.tsx
│   │   └── forms/           # Form components
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Income.tsx
│   │   ├── Expenses.tsx
│   │   ├── investments/
│   │   │   ├── MutualFunds.tsx
│   │   │   ├── Stocks.tsx
│   │   │   ├── FixedDeposits.tsx
│   │   │   └── RecurringDeposits.tsx
│   │   ├── liabilities/
│   │   │   └── CreditCards.tsx
│   │   ├── ProfileSettings.tsx
│   │   └── Landing.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useMutualFunds.ts
│   │   ├── useStocks.ts
│   │   ├── useTheme.ts
│   │   └── ...
│   ├── services/
│   │   ├── api.ts           # Axios instance
│   │   ├── authService.ts
│   │   ├── investmentService.ts
│   │   └── ...
│   ├── contexts/
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── lib/
│   │   └── utils.ts
│   ├── data/                # Static JSON mocks
│   │   ├── user.json
│   │   ├── mutual-funds.json
│   │   ├── stocks.json
│   │   ├── fixed-deposits.json
│   │   ├── credit-cards.json
│   │   └── dashboard.json
│   ├── routes/
│   │   ├── ProtectedRoute.tsx
│   │   └── index.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── components.json (shadcn config)
└── tsconfig.json
```

## Authentication Flow (Dummy Implementation)

### On App Load:
1. Check cookie for `auth_token`
2. Call `GET /api/me.json` (static mock)
3. If token valid → Returns `{ user: {...}, token: "..." }` → Auto-login → Redirect to `/dashboard`
4. If token invalid/missing → Redirect to `/landing`

### Landing Page:
- Show "Login with Google" button
- On click → Navigate to `/404` (placeholder - real OAuth later)

### Cookie Setup:
- Use `js-cookie` library
- Store token in cookie (httpOnly simulation)
- Include token in all API requests via Axios interceptor

## Design System (from HTML Mocks)

### Colors:
- **Primary Gradient**: Purple (#8b5cf6) to Indigo (#667eea)
- **Success**: Green (#10b981)
- **Danger**: Red (#ef4444)
- **Warning**: Orange (#f97316)
- **Info**: Blue (#3b82f6)
- **Neutral (no change)**: Gray (#6b7280)

### Dark Mode:
- Toggle in header
- Persistent via localStorage
- TailwindCSS dark: classes

### Component Patterns:
- **Widget Cards**: Rounded-xl, border, hover lift effect
- **Stats**: Large numbers with trend indicators (↑ ↓ —)
- **Charts**: Clean, with legends, responsive
- **Tables**: Sortable, paginated (5/10/20 rows)
- **Modals**: Centered, backdrop blur

## Pages to Build

### 1. Landing Page
- Hero section with gradient
- "Login with Google" → `/404`

### 2. Dashboard
**Widgets:**
- Net Worth Summary (gradient card)
- Quick Actions (4 buttons)
- Cash Flow This Month (3 columns: Income, Expenses, Investments)
- Expense Breakdown (donut chart)
- Investment widgets (MF, Stocks, SGB, Credit Cards, Goals, Allocation)
- **Cash Flow Trend** (6 months, 3 lines: Income/Expenses/Investments)
- **Net Worth Tracker** (area chart since inception, purple gradient)

### 3. Income Page
- List of income sources
- Add Income modal
- Filters, pagination

### 4. Expenses Page
- List of expenses by category
- Add Expense modal
- Category breakdown chart

### 5. Mutual Funds Page
- Summary cards (4)
- Portfolio growth chart
- Category allocation (donut)
- Holdings table (Scheme, Invested, Current, Returns, XIRR, Actions)
- Add Transaction modal (Buy/Sell, SIP/Lumpsum)

### 6. Stocks Page
- Summary cards
- Portfolio growth chart
- Market cap allocation + Sector allocation
- Holdings table (Stock, Qty, Avg Price, LTP, Returns, Broker)
- Add Transaction modal (Buy/Sell)

### 7. Fixed Deposits Page
- Summary cards (3: Total Invested, Expected Returns, Maturity Value)
- FD Table (Bank, Amount, Rate, Dates, Interest Payout)
- Add FD modal (Tenure: 3 fields - Years/Months/Days)

### 8. Recurring Deposits Page
- Similar to FD page
- Monthly installment tracking

### 9. Credit Cards Page
- Summary cards (Total Limit, Outstanding, Available, Next Due)
- Cards table with utilization bars
- Status badges (Safe/Warning/Overdue)
- Add Card modal, Record Payment modal

### 10. Profile Settings Page
- Profile picture upload
- Display name
- Timezone dropdown
- Currency dropdown (INR default)
- Currency conversion notice

## Key Features

### Personal/Family Tabs
- All investment pages have Personal/Family toggle
- Family tab shows "Coming Soon" badge (disabled)

### Charts Requirements
All charts using Recharts:
- **Line Chart**: Cash flow trend, portfolio growth
- **Area Chart**: Net worth tracker (gradient fill)
- **Donut Chart**: Expense breakdown, investment allocation, market cap
- **Bar Chart**: Sector allocation, category spending

### Animations
Use Framer Motion for:
- Page transitions
- Widget hover effects
- Modal enter/exit
- Chart loading states

### Coming Soon Items
Sidebar items marked as "Coming Soon" (grayed out, no click):
- SGB
- PPF
- NPS
- Loans
- Goals

## Data Layer

### Mock JSON Files (src/data/)

**user.json:**
```json
{
  "user": {
    "id": "user_1",
    "name": "Priyak Dey",
    "email": "priyak@example.com",
    "initials": "PD",
    "timezone": "Asia/Kolkata",
    "currency": "INR"
  },
  "token": "mock_token_12345"
}
```

**dashboard.json:**
- Net worth summary
- Cash flow data
- Investment allocations
- Widget data

**mutual-funds.json:**
- Holdings array
- Portfolio metrics
- Chart data

**stocks.json:**
- Stock holdings
- Market cap breakdown
- Sector allocation

**credit-cards.json:**
- Cards list
- Utilization data

### API Service Pattern:
```typescript
// services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
});

// Interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = Cookies.get('auth_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
```
```typescript
// services/investmentService.ts
import api from './api';

export const getMutualFunds = async () => {
  const response = await api.get('/mutual-funds.json');
  return response.data;
};
```

### TanStack Query Setup:
```typescript
// hooks/useMutualFunds.ts
import { useQuery } from '@tanstack/react-query';
import { getMutualFunds } from '@/services/investmentService';

export const useMutualFunds = () => {
  return useQuery({
    queryKey: ['mutualFunds'],
    queryFn: getMutualFunds,
  });
};
```

## Routing

Use TanStack Router with protected routes:
```typescript
// routes/index.tsx
const router = createRouter({
  routes: [
    { path: '/', component: Landing },
    { 
      path: '/dashboard', 
      component: Dashboard,
      beforeLoad: ({ context }) => {
        if (!context.auth.isAuthenticated) {
          throw redirect({ to: '/' });
        }
      }
    },
    // ... other protected routes
  ]
});
```

## Important Notes

### Investments vs Expenses
- **Expenses** = Consumption (rent, food, etc.)
- **Investments** = Wealth building (SIP, stocks, FDs)
- Show both separately in dashboards
- Calculations:
  - Savings Rate = (Investments / Income) × 100
  - Cash Left = Income - (Expenses + Investments)

### Indian Banking Specifics
- **FD Tenure**: 3 separate fields (Years, Months, Days) - matches real bank products
- **Interest Payout**: On Maturity, Monthly, Quarterly, Half-Yearly, Yearly
- **XIRR**: For mutual funds (irregular cash flows), NOT for FDs
- **Currency**: INR primary, with conversion support

### No Backend (Phase 1)
- All data from static JSON files
- Simulate delays with setTimeout if needed
- No real authentication - just cookie-based mock

## Commands to Run
```bash
# Initialize
pnpm create vite sampada --template react-ts
cd sampada
pnpm install

# Add dependencies
pnpm add @tanstack/react-router @tanstack/react-query
pnpm add recharts framer-motion axios js-cookie
pnpm add lucide-react class-variance-authority clsx tailwind-merge

# Setup Tailwind + shadcn
pnpm add -D tailwindcss postcss autoprefixer
pnpx tailwindcss init -p
pnpx shadcn-ui@latest init

# Add shadcn components
pnpx shadcn-ui@latest add button card input select table tabs

# Run dev server
pnpm dev
```

## Design Reference
All HTML mocks have been created and finalized. Reference them for exact layouts, spacing, colors, and interactions. The React version should match pixel-perfect where possible while being properly componentized.

## Success Criteria
- ✅ All pages from mocks implemented
- ✅ Dark mode works everywhere
- ✅ Auth flow with cookie + /me call
- ✅ Protected routes redirect properly
- ✅ All charts render with real data from JSON
- ✅ Animations smooth (Framer Motion)
- ✅ Modular, reusable components
- ✅ TypeScript strict mode, no `any`
- ✅ Responsive (mobile-first)
- ✅ Runs on `localhost:5173` with `pnpm dev`



## HTML Design Reference Files

### Location & Purpose
All finalized HTML mocks are in the root directory. These are the **design specification** - the React app must match these pixel-perfect.

**HTML Files (Design Source of Truth):**
```
/dashboard.html
/income.html
/expenses.html
/landing.html
/profile-settings.html
/investments/mutual-funds.html
/investments/stocks.html
/investments/fixed-deposits.html
/investments/recurring-deposits.html
/liabilities/credit-cards.html
```

### How to Use These Files

#### 1. Study the HTML Structure
Before creating any React component, **open and analyze** the corresponding HTML file:
- Note the exact layout structure (grids, flex, spacing)
- Identify reusable patterns (widget cards, stat boxes, tables)
- Extract exact TailwindCSS classes used
- Note all interactive elements (modals, dropdowns, toggles)
- Understand the data structure displayed

#### 2. Convert HTML Routes to React Routes

**HTML Navigation Pattern:**
```html
<!-- HTML uses direct file links -->
<a href="dashboard.html">Dashboard</a>
<a href="investments/mutual-funds.html">Mutual Funds</a>
<a href="../dashboard.html">Dashboard</a> <!-- from nested pages -->
```

**React Router Pattern:**
```typescript
// Convert to React Router links
<Link to="/dashboard">Dashboard</Link>
<Link to="/investments/mutual-funds">Mutual Funds</Link>
<Link to="/dashboard">Dashboard</Link> // no ../ needed
```

**Route Mapping:**
| HTML File | React Route | Component |
|-----------|-------------|-----------|
| `landing.html` | `/` | `Landing.tsx` |
| `dashboard.html` | `/dashboard` | `Dashboard.tsx` |
| `income.html` | `/income` | `Income.tsx` |
| `expenses.html` | `/expenses` | `Expenses.tsx` |
| `investments/mutual-funds.html` | `/investments/mutual-funds` | `MutualFunds.tsx` |
| `investments/stocks.html` | `/investments/stocks` | `Stocks.tsx` |
| `investments/fixed-deposits.html` | `/investments/fixed-deposits` | `FixedDeposits.tsx` |
| `investments/recurring-deposits.html` | `/investments/recurring-deposits` | `RecurringDeposits.tsx` |
| `liabilities/credit-cards.html` | `/liabilities/credit-cards` | `CreditCards.tsx` |
| `profile-settings.html` | `/profile-settings` | `ProfileSettings.tsx` |

#### 3. Component Extraction Strategy

**Example: Analyzing dashboard.html**

**Step 1 - Identify Reusable Components:**
```html
<!-- HTML: Repeated widget card pattern -->
<div class="widget-card bg-white dark:bg-gray-900 rounded-xl border...">
  <div class="flex items-center justify-between mb-4">
    <div>
      <h3>Widget Title</h3>
      <p class="text-xs text-gray-500">Subtitle</p>
    </div>
    <div class="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
      <svg>...</svg>
    </div>
  </div>
  <!-- Content -->
</div>
```

**Step 2 - Create React Component:**
```typescript
// components/widgets/WidgetCard.tsx
interface WidgetCardProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  iconBgColor?: string;
  children: React.ReactNode;
}

export const WidgetCard = ({ 
  title, 
  subtitle, 
  icon, 
  iconBgColor = 'bg-purple-100 dark:bg-purple-900/20',
  children 
}: WidgetCardProps) => {
  return (
    <div className="widget-card bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:transform hover:-translate-y-1 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        <div className={`p-2 ${iconBgColor} rounded-lg`}>
          {icon}
        </div>
      </div>
      {children}
    </div>
  );
};
```

**Step 3 - Use in Page:**
```typescript
// pages/Dashboard.tsx
import { WidgetCard } from '@/components/widgets/WidgetCard';
import { TrendingUp } from 'lucide-react';

export const Dashboard = () => {
  return (
    <WidgetCard
      title="Mutual Funds"
      subtitle="Past 30 Days"
      icon={<TrendingUp className="w-5 h-5 text-purple-600" />}
      iconBgColor="bg-purple-100 dark:bg-purple-900/20"
    >
      {/* Widget content from HTML */}
    </WidgetCard>
  );
};
```

#### 4. Common Component Patterns to Extract

**From HTML Analysis, Create These Reusable Components:**
```typescript
// Core UI Components (from shadcn + custom)
components/ui/
  - Button.tsx
  - Card.tsx
  - Input.tsx
  - Select.tsx
  - Table.tsx
  - Modal.tsx
  - Tabs.tsx

// Layout Components (from common HTML structure)
components/layout/
  - Sidebar.tsx          // Extract from HTML sidebar structure
  - Header.tsx           // Extract from HTML header
  - MainLayout.tsx       // Wrapper combining sidebar + header
  - PageHeader.tsx       // Page title + actions pattern

// Widget Components (from dashboard HTML)
components/widgets/
  - WidgetCard.tsx       // Base widget container
  - StatCard.tsx         // Stat with icon and trend
  - CashFlowWidget.tsx   // Cash flow 3-column layout
  - ExpenseBreakdown.tsx // Donut chart widget
  - NetWorthTracker.tsx  // Area chart widget
  - PortfolioGrowth.tsx  // Line chart widget

// Chart Components (extracted from HTML SVG patterns)
components/charts/
  - LineChart.tsx        // Convert HTML polyline to Recharts
  - AreaChart.tsx        // Convert HTML polygon to Recharts
  - DonutChart.tsx       // Convert HTML circle to Recharts
  - ProgressBar.tsx      // Horizontal bars with labels

// Table Components (from holdings tables)
components/tables/
  - DataTable.tsx        // Base sortable, paginated table
  - HoldingsTable.tsx    // Investment holdings
  - TransactionTable.tsx // Transaction history

// Form Components (from modals)
components/forms/
  - AddTransactionModal.tsx
  - AddExpenseModal.tsx
  - AddIncomeModal.tsx
```

#### 5. Preserve HTML Functionality in React

**Quick Actions Modal Example:**

**HTML Pattern:**
```html
<button id="quick-add-expense">Add Expense</button>

<script>
  document.getElementById('quick-add-expense').addEventListener('click', () => {
    showExpenseModal();
  });
</script>
```

**React Pattern:**
```typescript
// Use state for modal visibility
const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

<Button onClick={() => setIsExpenseModalOpen(true)}>
  Add Expense
</Button>

<AddExpenseModal 
  isOpen={isExpenseModalOpen}
  onClose={() => setIsExpenseModalOpen(false)}
/>
```

#### 6. Dark Mode Translation

**HTML Pattern:**
```html
<script>
  function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newTheme);
  }
</script>
```

**React Pattern:**
```typescript
// contexts/ThemeContext.tsx
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return localStorage.getItem('theme') as 'light' | 'dark' || 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

#### 7. Animation Conversion

**HTML Hover Effects:**
```css
.widget-card {
  transition: transform 0.2s, box-shadow 0.2s;
}
.widget-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

**React with Framer Motion:**
```typescript
import { motion } from 'framer-motion';

<motion.div
  className="widget-card"
  whileHover={{ y: -4 }}
  transition={{ type: 'spring', stiffness: 300 }}
>
  {/* Widget content */}
</motion.div>
```

#### 8. Data Integration

**HTML Static Data:**
```html
<p class="text-3xl font-bold">₹4,25,000</p>
<span class="text-sm stat-up font-semibold">+12.4%</span>
```

**React with TanStack Query:**
```typescript
const { data: mutualFunds } = useMutualFunds();

<p className="text-3xl font-bold">
  {formatCurrency(mutualFunds?.currentValue)}
</p>
<span className="text-sm stat-up font-semibold">
  {formatPercentage(mutualFunds?.returns)}
</span>
```

## Critical Instructions for Component Creation

### DO:
✅ Open each HTML file and study it thoroughly before creating components
✅ Copy exact TailwindCSS classes from HTML (they're proven to work)
✅ Extract repeated patterns into reusable components
✅ Convert all `href="page.html"` to React Router `<Link to="/page">`
✅ Preserve hover effects, transitions, and visual feedback
✅ Keep the same color scheme, spacing, and typography
✅ Maintain dark mode support throughout
✅ Use the exact same chart data structures

### DON'T:
❌ Create components without referencing HTML first
❌ Change the design/layout arbitrarily
❌ Use different color schemes
❌ Skip animations that exist in HTML
❌ Use inline styles instead of Tailwind classes
❌ Leave placeholder/dummy text - use proper data flow

## Step-by-Step Component Creation Process

**For Each Page:**

1. **Open HTML file** → Study structure
2. **List all sections** → Identify components needed
3. **Create layout component** → Header, main content structure
4. **Create widget components** → Reusable cards, stats
5. **Create chart components** → Match HTML chart styling
6. **Wire data** → Connect to TanStack Query hooks
7. **Add interactions** → Modals, buttons, filters
8. **Test dark mode** → Ensure all Tailwind dark: classes work
9. **Add animations** → Framer Motion for page transitions
10. **Verify responsiveness** → Mobile layout matches HTML

## Example: Converting dashboard.html Step-by-Step
```bash
# 1. Study dashboard.html
# - Identify: Net Worth banner, Quick Actions, 6 widget rows, 2-column bottom row

# 2. Create layout
src/pages/Dashboard.tsx

# 3. Extract components (by analyzing HTML structure):
src/components/widgets/NetWorthBanner.tsx  # Purple gradient card
src/components/widgets/QuickActions.tsx     # 4-button grid
src/components/widgets/CashFlowWidget.tsx   # 3-column stats
src/components/widgets/MutualFundsWidget.tsx # With area chart
src/components/widgets/CashFlowTrendChart.tsx # 3-line chart
src/components/widgets/NetWorthTrackerChart.tsx # Area chart

# 4. Create charts (from HTML SVG patterns):
src/components/charts/AreaChart.tsx
src/components/charts/LineChart.tsx
src/components/charts/DonutChart.tsx

# 5. Wire up data:
src/hooks/useDashboard.ts
src/services/dashboardService.ts
src/data/dashboard.json
```

## Sidebar Navigation - Critical Conversion

**HTML Pattern:**
```html
<a href="dashboard.html" class="nav-item active">Dashboard</a>
<a href="investments/mutual-funds.html" class="nav-item">Mutual Funds</a>
```

**React Pattern with Active State:**
```typescript
import { Link, useLocation } from '@tanstack/react-router';

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav>
      <Link 
        to="/dashboard"
        className={cn(
          "nav-item flex items-center gap-3 px-3 py-2 rounded-lg",
          isActive('/dashboard') && "active"
        )}
      >
        Dashboard
      </Link>
      <Link 
        to="/investments/mutual-funds"
        className={cn(
          "nav-item flex items-center gap-3 px-3 py-2 rounded-lg",
          isActive('/investments/mutual-funds') && "active"
        )}
      >
        Mutual Funds
      </Link>
    </nav>
  );
};
```
