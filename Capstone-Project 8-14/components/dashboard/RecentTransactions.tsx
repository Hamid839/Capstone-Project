import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { MOCK_CUSTOMERS, MOCK_TRANSACTIONS } from "@/lib/mock/customers";

function formatRs(amount: number) {
  const sign = amount < 0 ? "− " : "+ ";
  return `${sign}Rs ${Math.abs(amount).toLocaleString()}`;
}

export default function RecentTransactions() {
  const rows = MOCK_TRANSACTIONS.map((t) => ({
    ...t,
    customerName: MOCK_CUSTOMERS.find((c) => c.id === t.customerId)?.name ?? "Unknown",
  }));

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Recent transactions</CardTitle>
        <Link href="/customers" className="text-xs font-medium text-brass-600 hover:underline">
          View all customers
        </Link>
      </CardHeader>
      <CardContent>
        {rows.map((row) => (
          <Link key={row.id} href={`/customers/${row.customerId}`} className="ledger-row block">
            <span>
              <span className="ledger-row__label block text-ink-900">{row.customerName}</span>
              <span className="ledger-row__label text-xs">{row.note}</span>
            </span>
            <span className={`ledger-row__value ${row.amount >= 0 ? "text-credit" : "text-debit"}`}>
              {formatRs(row.amount)}
            </span>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
