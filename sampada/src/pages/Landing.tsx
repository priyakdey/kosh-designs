import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";

export function Landing() {
  const [modalOpen, setModalOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { login } = useAuth();

  const handleLogin = async () => {
    await login();
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-effect">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-2 rounded-lg text-white">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold gradient-text">Sampada</span>
            </div>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700 dark:text-gray-300">
              <a
                href="#features"
                className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
              >
                Pricing
              </a>
              <a
                href="#why-sampada"
                className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
              >
                Why Sampada
              </a>
              <a
                href="#faq"
                className="hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
              >
                FAQ
              </a>
            </nav>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={openModal}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              Your Family's Financial
              <br />
              <span className="gradient-text">Dashboard</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Track income, expenses, investments, and goals - all in one place.
              Built for modern Indian families.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button
                onClick={openModal}
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-200"
              >
                Get Started
              </button>
              <a
                href="#features"
                className="px-8 py-4 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Learn More
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              <div>
                <div className="text-3xl font-bold gradient-text">Free</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Early Access
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text">5 min</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Setup Time
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text">
                  &infin;
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Family Members
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to
              <span className="gradient-text"> Track Your Wealth</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              A single source of truth for your entire family's finances
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Complete Financial Tracking",
                desc: "Track income, expenses, mutual funds, stocks, FDs, PPF, and more - all in one unified dashboard.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                ),
              },
              {
                title: "Family Collaboration",
                desc: "Invite family members to share financial data, track household expenses, and plan together.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                ),
              },
              {
                title: "Secure & Private",
                desc: "Your data stays with you. No third-party integrations, no data selling, just pure tracking.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                ),
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white mb-4">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {feature.icon}
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Pricing</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Simple, clear, and transparent
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="p-8 md:p-10 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8">
                <div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 mb-4">
                    Current Plan
                  </div>
                  <h3 className="text-3xl font-bold mb-2">Early Access</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-xs">
                    Full access during the current release phase.
                  </p>
                </div>
                <div className="sm:text-right">
                  <div className="text-4xl font-bold">&#8377;0</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    per month
                  </div>
                </div>
              </div>
              <div className="grid gap-3 text-sm text-gray-700 dark:text-gray-300">
                {[
                  "Income and expense tracking",
                  "Investment tracking dashboard",
                  "Family member collaboration",
                  "Founder-led support",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-gray-200 dark:border-gray-800 px-4 py-3"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 md:p-10 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/60 opacity-90">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8">
                <div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 mb-4">
                    Coming Soon
                  </div>
                  <h3 className="text-3xl font-bold mb-2">Pro</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-xs">
                    For users who need expanded limits and advanced controls.
                  </p>
                </div>
                <div className="sm:text-right">
                  <div className="text-4xl font-bold text-gray-500 dark:text-gray-400">
                    TBD
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    per month
                  </div>
                </div>
              </div>
              <div className="grid gap-3 text-sm text-gray-600 dark:text-gray-300">
                {[
                  "Higher storage allocation",
                  "Feature unlocks for power users",
                  "Priority support queue",
                  "Everything in Early Access",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-gray-200 dark:border-gray-800 px-4 py-3"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center italic">
                * If paid plans are introduced later, they will be structured by
                features and storage with advance notice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Sampada */}
      <section id="why-sampada" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Families Choose{" "}
              <span className="gradient-text">Sampada</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Clear positioning for a tracking-first product
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <h3 className="text-2xl font-bold mb-4">What Sampada is</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li>
                  Consolidated income, expense, and investment tracking
                </li>
                <li>
                  Family-level visibility for net worth and cash flow
                </li>
                <li>
                  Simple records of assets like MF, stocks, FD, and PPF
                </li>
              </ul>
            </div>
            <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <h3 className="text-2xl font-bold mb-4">What Sampada is not</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li>Not a brokerage account</li>
                <li>Not a trading terminal</li>
                <li>Not a financial product marketplace</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Data Scope */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Data Scope & Transparency
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Clear expectations on data sources and update cadence
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <h3 className="text-2xl font-bold mb-4">
                Automated market data
              </h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li>
                  Mutual funds via public MF APIs and scheme datasets
                </li>
                <li>
                  Daily NAV refresh based on previous market day close
                </li>
                <li>Stocks sourced from NSE public endpoints</li>
              </ul>
            </div>
            <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <h3 className="text-2xl font-bold mb-4">
                Manual tracking modules
              </h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li>Income entries are manually maintained</li>
                <li>Expense tracking is manually maintained</li>
                <li>
                  Fixed deposits and similar instruments are manually maintained
                </li>
              </ul>
            </div>
          </div>

          <p className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
            Account Aggregator (AA) integration is currently not available. Data
            is sourced from selected public market endpoints and user-maintained
            entries.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Answers users expect before signing up
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Does Sampada support trading or order placement?",
                a: "No. Sampada is a tracking and reporting platform only.",
              },
              {
                q: "Who is this built for?",
                a: "Individuals and families who want one place to monitor money, assets, and goals.",
              },
              {
                q: "How long does setup take?",
                a: "Most households can set up their first dashboard in about 5 minutes.",
              },
              {
                q: "Do you connect via Account Aggregator (AA)?",
                a: "Not currently. The platform combines selected public market data with manual entries.",
              },
              {
                q: "Which values are automated vs manually entered?",
                a: "Mutual fund and stock references are refreshed from public sources, while income, expenses, and fixed deposits are manually maintained.",
              },
              {
                q: "Will pricing remain free forever?",
                a: "Early access is free. If paid plans are introduced, pricing will be based on feature access and storage limits, not a reduced quality of core service.",
              },
              {
                q: "How quickly can I expect support responses?",
                a: "Support is currently founder-led. Replies are handled personally and may be delayed during high request volume.",
              },
            ].map((faq) => (
              <details
                key={faq.q}
                className="group p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              >
                <summary className="cursor-pointer font-semibold text-lg">
                  {faq.q}
                </summary>
                <p className="mt-3 text-gray-600 dark:text-gray-300">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="p-10 md:p-14 rounded-3xl bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Start tracking your family wealth today
            </h2>
            <p className="text-lg md:text-xl text-purple-100 mb-8">
              Get a single dashboard for income, expenses, and long-term assets.
            </p>
            <button
              onClick={openModal}
              className="px-8 py-4 rounded-lg bg-white text-purple-700 text-lg font-semibold hover:scale-105 transition-transform"
            >
              Create Free Account
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-2 rounded-lg text-white">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold gradient-text">Sampada</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              &copy; 2026 Sampada. Built for Indian families.
            </p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-3 rounded-xl text-white">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-center mb-2">
                Welcome to <span className="gradient-text">Sampada</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
                Track your family's wealth, together
              </p>

              <button
                onClick={handleLogin}
                className="w-full py-4 px-6 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-3 font-semibold"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Login with, Google
              </button>

              <p className="text-xs text-gray-500 dark:text-gray-500 text-center mt-6">
                By continuing, you agree to our terms and privacy policy.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
