import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-sm text-ink-400">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-1.5">
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-ink-900">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-ink-900" : ""}>{item.label}</span>
            )}
            {!isLast && <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
          </span>
        );
      })}
    </nav>
  );
}
