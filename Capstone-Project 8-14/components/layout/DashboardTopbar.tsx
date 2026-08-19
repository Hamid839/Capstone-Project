"use client";

import { Menu, BookOpen } from "lucide-react";

export default function DashboardTopbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-paper-rule bg-paper/90 px-4 py-3 backdrop-blur md:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-md p-2 text-ink-900 md:hidden"
          aria-label="Open menu"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2 font-display text-base font-semibold text-ink-900">
          <BookOpen className="h-4 w-4 text-brass" aria-hidden="true" />
          HisabDo Web
        </div>
      </div>
      <div className="h-8 w-8 rounded-full bg-ink-900 text-center text-sm leading-8 text-paper">
        H
      </div>
    </header>
  );
}
