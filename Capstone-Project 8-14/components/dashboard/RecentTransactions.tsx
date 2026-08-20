import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

type Row = {
  id: string;
  customerId: string;
  customerName: string;
  note: string;
  amount: number;
};

function formatRs(amount: number) {
  const sign = amount < 0 ? "− " : "+ ";
  return `${sign}Rs ${Math.abs(amount).toLocaleString()}`;
}

export default function RecentTransactions({ rows }: { rows: Row[] }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Transactions</CardTitle>
        <Link href="/transactions" className="text-sm text-brass-600 hover:underline">
          View all
        </Link>
      </CardHeader>
      <CardContent>
        {rows.length === 0 ? (
          <p className="py-8 text-center text-sm text-ink-400">No recent transactions</p>
        ) : (
          rows.map((row) => (
            <Link
              key={row.id}
              href={`/customers/${row.customerId}`}
              className="ledger-row block"
            >
              <span>
                <span className="ledger-row__label block text-ink-900">
                  {row.customerName}
                </span>
                <span className="ledger-row__label text-xs">{row.note}</span>
              </span>
              <span
                className={`ledger-row__value ${
                  row.amount >= 0 ? "text-credit" : "text-debit"
                }`}
              >
                {formatRs(row.amount)}
              </span>
            </Link>
          ))
        )}
      </CardContent>
    </Card>
  );
}