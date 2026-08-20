import type { ReactNode } from "react";

type Tone = "credit" | "debit" | "neutral";

const TONE_CLASSES: Record<Tone, string> = {
  credit: "bg-credit-50 text-credit",
  debit: "bg-debit-50 text-debit",
  neutral: "bg-paper-rule text-ink-700",
};

export default function Badge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${TONE_CLASSES[tone]}`}
    >
      {children}
    </span>
  );
}
