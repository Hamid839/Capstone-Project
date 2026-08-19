import {
  Mic,
  Languages,
  FileDown,
  CloudUpload,
  Users,
  Wifi,
  BarChart3,
  Bell,
} from "lucide-react";

const FEATURE_GROUPS = [
  {
    title: "Recording",
    items: [
      {
        icon: Mic,
        name: "Voice entry",
        detail:
          "Say the customer name and amount out loud — HisabDo logs it as a transaction. Faster than typing when your hands are busy.",
      },
      {
        icon: Wifi,
        name: "Offline-first",
        detail:
          "Every entry saves to your device first. No signal at the shop doesn't mean no ledger — sync happens when you're back online.",
      },
    ],
  },
  {
    title: "Managing customers",
    items: [
      {
        icon: Users,
        name: "Customer-wise ledger",
        detail:
          "Each customer gets their own running balance — see exactly who owes what, and what you owe them, without flipping through pages.",
      },
      {
        icon: Languages,
        name: "Multi-language, multi-currency",
        detail:
          "Switch between Urdu, English, Hindi, Arabic, and Roman Urdu, and record in PKR, USD, or INR — whatever the customer uses.",
      },
    ],
  },
  {
    title: "Reporting",
    items: [
      {
        icon: FileDown,
        name: "PDF statements",
        detail:
          "Generate a clean statement for one customer or a date range, and share it directly over WhatsApp or email.",
      },
      {
        icon: BarChart3,
        name: "Analytics",
        detail:
          "See cash flow trends, your top debtors, and how the business is moving month over month — not just today's total.",
      },
    ],
  },
  {
    title: "Peace of mind",
    items: [
      {
        icon: CloudUpload,
        name: "Backup & restore",
        detail:
          "A lost or broken phone doesn't mean a lost ledger. Back up to the cloud and restore on any device in minutes.",
      },
      {
        icon: Bell,
        name: "Payment reminders",
        detail:
          "Get nudged when a customer's payment is due, so nothing quietly slips past the due date.",
      },
    ],
  },
] as const;

export default function FeaturesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-brass-600">Features</p>
        <h1 className="mt-3 text-3xl font-semibold text-ink-900 sm:text-4xl">
          Everything on the shop counter, digitized
        </h1>
        <p className="mt-4 text-ink-400">
          HisabDo doesn't try to be a full accounting suite. It does the one thing a paper
          khata does — tracking what's owed — and does it faster, safer, and shareable.
        </p>
      </div>

      <div className="mt-14 space-y-14">
        {FEATURE_GROUPS.map((group) => (
          <div key={group.title}>
            <h2 className="border-b border-paper-rule pb-3 text-sm font-semibold uppercase tracking-wide text-ink-400">
              {group.title}
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.name} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brass-50 text-brass-600">
                      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-ink-900">{item.name}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-400">{item.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
