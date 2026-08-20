"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ArrowLeftRight,
  BookOpen,
  BarChart3,
  FileText,
  Bell,
  Settings,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { href: "/ledger", label: "Ledger", icon: BookOpen },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({
  mobileOpen = false,
  onClose,
}: {
  mobileOpen?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();

  const linkList = (
    <ul className="space-y-1">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const active = item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-ink-900 text-paper"
                  : "text-ink-400 hover:bg-paper-rule/60 hover:text-ink-900"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 border-r border-paper-rule bg-paper-panel px-3 py-6 md:block">
        {linkList}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            aria-label="Close sidebar"
            className="absolute inset-0 bg-ink-900/40"
            onClick={onClose}
          />
          <aside className="absolute left-0 top-0 h-full w-64 bg-paper-panel px-3 py-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between px-2">
              <span className="font-display text-sm font-semibold text-ink-900">Menu</span>
              <button aria-label="Close" onClick={onClose}>
                <X className="h-5 w-5 text-ink-700" />
              </button>
            </div>
            {linkList}
          </aside>
        </div>
      )}
    </>
  );
}
