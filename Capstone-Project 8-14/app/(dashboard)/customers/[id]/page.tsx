"use client";

import { notFound } from "next/navigation";
import { Phone, StickyNote } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { MOCK_CUSTOMERS, MOCK_TRANSACTIONS, getCustomerBalance } from "@/lib/mock/customers";

function formatRs(amount: number) {
  const sign = amount < 0 ? "− " : "+ ";
  return `${sign}Rs ${Math.abs(amount).toLocaleString()}`;
}

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  const customer = MOCK_CUSTOMERS.find((c) => c.id === params.id);

  if (!customer) {
    notFound();
  }

  const transactions = MOCK_TRANSACTIONS.filter((t) => t.customerId === customer.id);
  const balance = getCustomerBalance(customer.id);

  return (
    <div className="mx-auto max-w-3xl">
      <Breadcrumbs
        items={[{ label: "Customers", href: "/customers" }, { label: customer.name }]}
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink-900">{customer.name}</h1>
          {customer.phone && (
            <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-400">
              <Phone className="h-3.5 w-3.5" /> {customer.phone}
            </p>
          )}
          {customer.notes && (
            <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-400">
              <StickyNote className="h-3.5 w-3.5" /> {customer.notes}
            </p>
          )}
        </div>
        <Badge tone={balance >= 0 ? "credit" : "debit"}>{formatRs(balance)}</Badge>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Transaction history</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <p className="py-6 text-center text-sm text-ink-400">No transactions recorded yet.</p>
          ) : (
            transactions.map((t) => (
              <div key={t.id} className="ledger-row">
                <span>
                  <span className="ledger-row__label block text-ink-900">{t.note}</span>
                  <span className="ledger-row__label text-xs">{t.date}</span>
                </span>
                <span
                  className={`ledger-row__value ${t.amount >= 0 ? "text-credit" : "text-debit"}`}
                >
                  {formatRs(t.amount)}
                </span>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <p className="mt-4 text-xs text-ink-400">
        Demo data for now — this view will read from the real API once{" "}
        <code>server/</code> is connected.
      </p>
    </div>
  );
}
