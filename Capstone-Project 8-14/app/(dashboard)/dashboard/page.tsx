import { TrendingUp, TrendingDown, Users, ArrowLeftRight } from "lucide-react";
import Link from "next/link";
import StatCard from "@/components/dashboard/StatCard";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import { getDashboardStats, getTransactions, getCustomerById } from "@/lib/mock/customers";

export default function DashboardPage() {
  const stats = getDashboardStats();
  const recent = getTransactions().slice(0, 5).map((t) => {
    const customer = getCustomerById(t.customerId);
    return {
      id: t.id,
      customerId: t.customerId,
      customerName: customer?.name || "Unknown",
      note: t.note,
      amount: t.amount,
    };
  });

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">Dashboard</h1>
        <p className="mt-1 text-sm text-ink-400">
          Overview of your business ledger
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Receivable"
          value={`Rs ${stats.totalReceivable.toLocaleString()}`}
          icon={TrendingUp}
          tone="credit"
        />
        <StatCard
          label="Total Payable"
          value={`Rs ${stats.totalPayable.toLocaleString()}`}
          icon={TrendingDown}
          tone="debit"
        />
        <StatCard
          label="Active Customers"
          value={String(stats.totalCustomers)}
          icon={Users}
          tone="neutral"
        />
        <StatCard
          label="Transactions"
          value={String(stats.totalTransactions)}
          icon={ArrowLeftRight}
          tone="neutral"
        />
      </div>

      {/* Quick links */}
      <div className="flex flex-wrap gap-3">
        <Link
          href="/customers/new"
          className="rounded-md bg-ink-900 px-4 py-2 text-sm font-medium text-paper hover:bg-brass-600"
        >
          + Add Customer
        </Link>
        <Link
          href="/transactions/new"
          className="rounded-md border border-paper-rule px-4 py-2 text-sm font-medium text-ink-900 hover:bg-paper-rule/40"
        >
          + Add Transaction
        </Link>
        <Link
          href="/ledger"
          className="rounded-md border border-paper-rule px-4 py-2 text-sm font-medium text-ink-900 hover:bg-paper-rule/40"
        >
          View Ledger
        </Link>
      </div>

      <RecentTransactions rows={recent} />
    </div>
  );
}