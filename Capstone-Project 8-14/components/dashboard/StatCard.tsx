import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";

type Tone = "credit" | "debit" | "neutral";

const TONE_TEXT: Record<Tone, string> = {
  credit: "text-credit",
  debit: "text-debit",
  neutral: "text-ink-900",
};

export default function StatCard({
  label,
  value,
  icon: Icon,
  tone = "neutral",
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  tone?: Tone;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-400">{label}</span>
        <Icon className={`h-4 w-4 ${TONE_TEXT[tone]}`} aria-hidden="true" />
      </div>
      <p className={`mt-3 font-ledger text-2xl font-semibold ${TONE_TEXT[tone]}`}>{value}</p>
    </Card>
  );
}
