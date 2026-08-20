"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { Card } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Table, { type Column } from "@/components/ui/Table";
import { MOCK_CUSTOMERS, getCustomerBalance } from "@/lib/mock/customers";
import type { Customer } from "@/lib/types";

function formatRs(amount: number) {
  const sign = amount < 0 ? "− " : amount > 0 ? "+ " : "";
  return `${sign}Rs ${Math.abs(amount).toLocaleString()}`;
}

export default function CustomersPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  // Read straight from the shared mock store so customers added via
  // /customers/new show up here without needing a real backend yet.
  const filtered = useMemo(
    () =>
      MOCK_CUSTOMERS.filter((c) => c.name.toLowerCase().includes(query.trim().toLowerCase())),
    [query]
  );

  const columns: Column<Customer>[] = [
    {
      header: "Customer",
      accessor: (c) => (
        <div>
          <p className="font-medium text-ink-900">{c.name}</p>
          <p className="text-xs text-ink-400">{c.phone || "No phone on file"}</p>
        </div>
      ),
    },
    {
      header: "Notes",
      hideOnMobile: true,
      accessor: (c) => <span className="text-ink-400">{c.notes || "—"}</span>,
    },
    {
      header: "Balance",
      className: "text-right",
      accessor: (c) => {
        const value = getCustomerBalance(c.id);
        return (
          <span className="flex justify-end">
            <Badge tone={value >= 0 ? "credit" : "debit"}>{formatRs(value)}</Badge>
          </span>
        );
      },
    },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink-900">Customers</h1>
          <p className="mt-1 text-sm text-ink-400">
            {MOCK_CUSTOMERS.length} customer{MOCK_CUSTOMERS.length === 1 ? "" : "s"} in your ledger
          </p>
        </div>
        <Link
          href="/customers/new"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-ink-900 px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-brass-600"
        >
          <Plus className="h-4 w-4" /> Add customer
        </Link>
      </div>

      <div className="relative mt-6">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search customers…"
          className="w-full rounded-md border border-paper-rule bg-paper-panel py-2 pl-9 pr-3 text-sm text-ink-900 outline-none focus:border-ink-900"
        />
      </div>

      <Card className="mt-4">
        <Table
          columns={columns}
          rows={filtered}
          keyExtractor={(c) => c.id}
          emptyMessage="No customers match your search."
          onRowClick={(c) => router.push(`/customers/${c.id}`)}
        />
      </Card>

      <p className="mt-4 text-xs text-ink-400">
        Demo data — lives only in this browser tab until the API in <code>server/</code> is
        connected in a later milestone.
      </p>
    </div>
  );
}
