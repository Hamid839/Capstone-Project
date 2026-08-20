"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import {
  getCustomers,
  getCustomerBalance,
  getTransactionsByCustomer,
} from "@/lib/mock/customers";

function formatRs(amount: number) {
  const sign = amount < 0 ? "− " : amount > 0 ? "+ " : "";
  return `${sign}Rs ${Math.abs(amount).toLocaleString()}`;
}

export default function LedgerPage() {
  const customers = getCustomers();
  const [selectedId, setSelectedId] = useState<string>(
    customers[0]?.id || ""
  );

  const selectedCustomer = customers.find((c) => c.id === selectedId);
  const balance = selectedId ? getCustomerBalance(selectedId) : 0;
  const transactions = useMemo(
    () => (selectedId ? getTransactionsByCustomer(selectedId) : []),
    [selectedId]
  );

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">Ledger</h1>
        <p className="mt-1 text-sm text-ink-400">
          View complete account history of any customer
        </p>
      </div>

      {/* Customer selector */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <label className="text-sm font-medium text-ink-900">Select Customer</label>
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="w-full max-w-md rounded-md border border-paper-rule bg-paper-panel px-3 py-2 text-sm outline-none focus:border-ink-900"
        >
          {customers.length === 0 && (
            <option value="">No customers yet</option>
          )}
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {!selectedCustomer ? (
        <Card>
          <div className="px-4 py-16 text-center text-ink-400">
            No customers available.{" "}
            <Link href="/customers/new" className="text-brass-600 underline">
              Add a customer
            </Link>{" "}
            first.
          </div>
        </Card>
      ) : (
        <>
          {/* Summary Card */}
          <Card>
            <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                  Current Balance
                </p>
                <p
                  className={`mt-1 font-ledger text-3xl font-semibold ${
                    balance > 0
                      ? "text-credit"
                      : balance < 0
                      ? "text-debit"
                      : "text-ink-900"
                  }`}
                >
                  {formatRs(balance)}
                </p>
                <p className="mt-1 text-sm text-ink-400">
                  {balance > 0
                    ? "Customer owes you"
                    : balance < 0
                    ? "You owe this customer"
                    : "Account settled"}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-ink-900">{selectedCustomer.name}</p>
                {selectedCustomer.phone && (
                  <p className="text-sm text-ink-400">{selectedCustomer.phone}</p>
                )}
                <Link
                  href={`/customers/${selectedCustomer.id}`}
                  className="mt-2 inline-block text-sm text-brass-600 hover:underline"
                >
                  View customer profile →
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {transactions.length === 0 ? (
                <div className="px-4 py-12 text-center text-ink-400">
                  No transactions for this customer yet.
                </div>
              ) : (
                <div className="divide-y divide-paper-rule">
                  {transactions.map((t) => (
                    <div
                      key={t.id}
                      className="flex items-center justify-between px-4 py-3 hover:bg-paper/50"
                    >
                      <div>
                        <p className="font-medium text-ink-900">{t.note}</p>
                        <p className="text-xs text-ink-400">{t.date}</p>
                      </div>
                      <Badge tone={t.amount >= 0 ? "credit" : "debit"}>
                        {formatRs(t.amount)}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}