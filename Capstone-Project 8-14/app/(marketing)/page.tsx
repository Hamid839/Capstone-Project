import Link from "next/link";
import { Mic, Languages, FileDown, CloudUpload, ArrowRight } from "lucide-react";

const LEDGER_PREVIEW = [
  { label: "Ahmed Traders", note: "Cloth — 3 bolts", value: "+ Rs 4,500", tone: "credit" },
  { label: "Bilal Kirana Store", note: "Payment received", value: "− Rs 2,000", tone: "debit" },
  { label: "Sana Beauty Parlour", note: "Supplies — monthly", value: "+ Rs 1,250", tone: "credit" },
  { label: "Waseem Hardware", note: "Payment received", value: "− Rs 6,000", tone: "debit" },
] as const;

const FEATURES = [
  {
    icon: Mic,
    label: "Voice entry",
    detail: "Speak a transaction instead of typing it — built for busy counters.",
  },
  {
    icon: Languages,
    label: "Multi-language",
    detail: "Urdu, English, Hindi, Arabic, and Roman Urdu, with PKR, USD, and INR.",
  },
  {
    icon: FileDown,
    label: "PDF statements",
    detail: "Export a clean, shareable statement for any customer or date range.",
  },
  {
    icon: CloudUpload,
    label: "Backup & restore",
    detail: "Your ledger survives a lost phone — sync to the cloud whenever you want.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-paper-rule bg-ledger-lines bg-[length:100%_44px]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center md:py-24 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brass-600">
              Digital khata, no paper required
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-ink-900 sm:text-5xl">
              Every udhar.
              <br />
              One ledger.
            </h1>
            <p className="mt-4 max-w-md text-base text-ink-400 sm:text-lg">
              HisabDo replaces the paper register with a running, customer-wise ledger —
              record what's given, what's received, and know your balance at a glance.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-ink-900 px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-brass-600"
              >
                Start your ledger <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/features"
                className="inline-flex items-center justify-center rounded-md border border-paper-rule px-6 py-3 text-sm font-medium text-ink-900"
              >
                See how it works
              </Link>
            </div>
          </div>

          {/* Signature ledger-row preview card */}
          <div className="rounded-lg border border-paper-rule bg-paper-panel p-5 shadow-sm sm:p-6">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-ink-400">
              <span>Customer</span>
              <span>Balance</span>
            </div>
            {LEDGER_PREVIEW.map((row) => (
              <div key={row.label} className="ledger-row">
                <span>
                  <span className="ledger-row__label block text-ink-900">{row.label}</span>
                  <span className="ledger-row__label text-xs">{row.note}</span>
                </span>
                <span
                  className={`ledger-row__value ${
                    row.tone === "credit" ? "text-credit" : "text-debit"
                  }`}
                >
                  {row.value}
                </span>
              </div>
            ))}
            <div className="ledger-row border-b-0 pt-4">
              <span className="text-sm font-semibold text-ink-900">Net balance</span>
              <span className="font-ledger text-base font-semibold text-credit">− Rs 2,250</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-ink-900 sm:text-3xl">
          Built for the counter, not the boardroom
        </h2>
        <p className="mt-2 max-w-2xl text-ink-400">
          Four things shopkeepers actually asked for — nothing they didn't.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.label} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brass-50 text-brass-600">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-ink-900">{f.label}</h3>
                  <p className="mt-1 text-sm text-ink-400">{f.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA band */}
      <section className="border-t border-paper-rule bg-ink-900">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-14 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold text-paper">Close the register, keep the ledger.</h2>
            <p className="mt-2 text-sm text-ink-100">
              Free to start. No paper, no lost pages, no arguments over what was owed.
            </p>
          </div>
          <Link
            href="/register"
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-brass px-6 py-3 text-sm font-medium text-ink-900 hover:bg-brass-600"
          >
            Create your ledger <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
