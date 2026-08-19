import Link from "next/link";
import { BookOpen } from "lucide-react";

const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { href: "/features", label: "Features" },
      { href: "/pricing", label: "Pricing" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/terms", label: "Terms" },
      { href: "/legal/privacy", label: "Privacy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-paper-rule bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 font-display text-lg font-semibold text-ink-900">
              <BookOpen className="h-5 w-5 text-brass" strokeWidth={1.75} aria-hidden="true" />
              HisabDo Web
            </div>
            <p className="mt-3 max-w-xs text-sm text-ink-400">
              A digital khata for shopkeepers — every udhar, every payment, one ledger.
            </p>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-ink-900">{col.title}</h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-ink-400 hover:text-ink-900">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-paper-rule pt-6 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} HisabDo Web Capstone. Built for learning, not affiliated with HisabDo.</p>
          <p>Made with Next.js · MERN</p>
        </div>
      </div>
    </footer>
  );
}
