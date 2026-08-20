import { TrendingUp, TrendingDown, Users } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import { MOCK_CUSTOMERS, getCustomerBalance } from "@/lib/mock/customers";

export default function DashboardPage() {
  const balances = MOCK_CUSTOMERS.map((c) => getCustomerBalance(c.id));
  const receivable = balances.filter((b) => b > 0).reduce((sum, b) => sum + b, 0);
  const payable = Math.abs(balances.filter((b) => b < 0).reduce((sum, b) => sum + b, 0));

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-semibold text-ink-900">Dashboard</h1>
      <p className="mt-1 text-sm text-ink-400">
        Demo data — wired up to the real API in a later milestone.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Total receivable"
          value={`Rs ${receivable.toLocaleString()}`}
          icon={TrendingUp}
          tone="credit"
        />
        <StatCard
          label="Total payable"
          value={`Rs ${payable.toLocaleString()}`}
          icon={TrendingDown}
          tone="debit"
        />
        <StatCard
          label="Active customers"
          value={String(MOCK_CUSTOMERS.length)}
          icon={Users}
          tone="neutral"
        />
      </div>

      <div className="mt-8">
        <RecentTransactions />
      </div>
    </div>
  );
}
