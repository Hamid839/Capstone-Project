"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, BookOpen } from "lucide-react";

const NAV_LINKS = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-paper-rule bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold text-ink-900">
          <BookOpen className="h-5 w-5 text-brass" strokeWidth={1.75} aria-hidden="true" />
          HisabDo Web
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink-400 transition-colors hover:text-ink-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login" className="text-sm font-medium text-ink-700 hover:text-ink-900">
            Log in
          </Link>
          <Link
            href="/register"
            className="rounded-md bg-ink-900 px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-brass-600"
          >
            Start free
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-ink-900 md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <nav className="border-t border-paper-rule bg-paper px-4 pb-6 pt-2 md:hidden" aria-label="Mobile primary">
          <ul className="flex flex-col divide-y divide-paper-rule">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-3 text-base text-ink-700"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-3">
            <Link
              href="/login"
              className="rounded-md border border-paper-rule px-4 py-2 text-center text-sm font-medium text-ink-900"
              onClick={() => setOpen(false)}
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="rounded-md bg-ink-900 px-4 py-2 text-center text-sm font-medium text-paper"
              onClick={() => setOpen(false)}
            >
              Start free
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
