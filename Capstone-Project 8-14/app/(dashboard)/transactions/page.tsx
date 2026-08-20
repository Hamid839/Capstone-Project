"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import {
  getTransactions,
  getCustomerById,
  deleteTransaction,
} from "@/lib/mock/customers";
import type { Transaction } from "@/lib/types";

function formatRs(amount: number) {
  const sign = amount < 0 ? "− " : "+ ";
  return `${sign}Rs ${Math.abs(amount).toLocaleString()}`;
}

export default function TransactionsPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [transactions, setTransactions] = useState(getTransactions());
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return transactions;
    return transactions.filter((t) => {
      const customer = getCustomerById(t.customerId);
      return (
        t.note.toLowerCase().includes(q) ||
        customer?.name.toLowerCase().includes(q)
      );
    });
  }, [query, transactions]);

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this transaction?")) return;
    setDeletingId(id);
    const success = deleteTransaction(id);
    if (success) {
      setTransactions(getTransactions());
    }
    setDeletingId(null);
  };

  return (
    <div className="mx-auto max-w-5xl">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink-900">Transactions</h1>
          <p className="mt-1 text-sm text-ink-400">
            {transactions.length} transaction
            {transactions.length === 1 ? "" : "s"} recorded
          </p>
        </div>

        <Link href="/transactions/new">
          <Button className="inline-flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Transaction
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative mt-6">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by customer or note…"
          className="w-full rounded-md border border-paper-rule bg-paper-panel py-2 pl-9 pr-3 text-sm outline-none focus:border-ink-900"
        />
      </div>

      {/* Table */}
      <Card className="mt-4 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="px-4 py-16 text-center text-ink-400">
            {query
              ? "No transactions match your search."
              : "No transactions yet. Click “Add Transaction” to create one."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-paper-rule bg-paper text-xs font-semibold uppercase tracking-wide text-ink-400">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3 hidden md:table-cell">Note</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-paper-rule">
                {filtered.map((t) => {
                  const customer = getCustomerById(t.customerId);
                  return (
                    <tr key={t.id} className="hover:bg-paper/60">
                      <td className="px-4 py-3 text-ink-400 whitespace-nowrap">
                        {t.date}
                      </td>
                      <td className="px-4 py-3 font-medium text-ink-900">
                        {customer?.name || "Unknown"}
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell text-ink-400 max-w-xs truncate">
                        {t.note}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Badge tone={t.amount >= 0 ? "credit" : "debit"}>
                          {formatRs(t.amount)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() =>
                              router.push(`/transactions/${t.id}/edit`)
                            }
                            className="rounded p-1.5 text-ink-400 hover:bg-paper-rule hover:text-ink-900"
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(t.id)}
                            disabled={deletingId === t.id}
                            className="rounded p-1.5 text-ink-400 hover:bg-debit-50 hover:text-debit"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}