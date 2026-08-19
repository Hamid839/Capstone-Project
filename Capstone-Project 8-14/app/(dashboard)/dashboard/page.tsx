import { TrendingUp, TrendingDown, Users } from "lucide-react";

const STATS = [
  { label: "Total receivable", value: "Rs 128,400", icon: TrendingUp, tone: "credit" },
  { label: "Total payable", value: "Rs 42,150", icon: TrendingDown, tone: "debit" },
  { label: "Active customers", value: "37", icon: Users, tone: "neutral" },
] as const;

const RECENT = [
  { label: "Ahmed Traders", note: "Cloth — 3 bolts", value: "+ Rs 4,500", tone: "credit" },
  { label: "Bilal Kirana Store", note: "Payment received", value: "− Rs 2,000", tone: "debit" },
  { label: "Sana Beauty Parlour", note: "Supplies — monthly", value: "+ Rs 1,250", tone: "credit" },
  { label: "Waseem Hardware", note: "Payment received", value: "− Rs 6,000", tone: "debit" },
  { label: "Imran Electronics", note: "Repair parts", value: "+ Rs 3,800", tone: "credit" },
] as const;

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-semibold text-ink-900">Dashboard</h1>
      <p className="mt-1 text-sm text-ink-400">Sample data — wired up to the API in a later milestone.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {STATS.map((s) => {
          const Icon = s.icon;
          const toneClass =
            s.tone === "credit" ? "text-credit" : s.tone === "debit" ? "text-debit" : "text-ink-900";
          return (
            <div key={s.label} className="rounded-lg border border-paper-rule bg-paper-panel p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                  {s.label}
                </span>
                <Icon className={`h-4 w-4 ${toneClass}`} aria-hidden="true" />
              </div>
              <p className={`mt-3 font-ledger text-2xl font-semibold ${toneClass}`}>{s.value}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-lg border border-paper-rule bg-paper-panel p-5 sm:p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-400">
          Recent transactions
        </h2>
        <div className="mt-3">
          {RECENT.map((row) => (
            <div key={row.label + row.note} className="ledger-row">
              <span>
                <span className="ledger-row__label block text-ink-900">{row.label}</span>
                <span className="ledger-row__label text-xs">{row.note}</span>
              </span>
              <span
                className={`ledger-row__value ${row.tone === "credit" ? "text-credit" : "text-debit"}`}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
