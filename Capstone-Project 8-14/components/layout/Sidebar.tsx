"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ArrowLeftRight,
  BookOpen,
  BarChart3,
  FileText,
  Settings,
  User,
  LogOut,
  X,
} from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { href: "/ledger", label: "Ledger", icon: BookOpen },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/profile", label: "Profile", icon: User },
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
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    if (onClose) onClose();
    router.push("/login");
  };

  const linkList = (
    <ul className="space-y-1">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const active =
          item.href === "/dashboard"
            ? pathname === item.href
            : pathname.startsWith(item.href);

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
              <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  const userSection = (
    <div className="mt-6 border-t border-paper-rule pt-4">
      {user && (
        <div className="mb-3 px-3">
          <p className="text-sm font-medium text-ink-900 truncate">{user.name}</p>
          <p className="text-xs text-ink-400 truncate">{user.email}</p>
        </div>
      )}

      <button
        onClick={handleLogout}
        className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-debit hover:bg-debit-50 transition-colors"
      >
        <LogOut className="h-4 w-4 shrink-0" strokeWidth={1.75} />
        Logout
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 border-r border-paper-rule bg-paper-panel px-3 py-6 md:flex md:flex-col">
        <div className="flex-1">{linkList}</div>
        {userSection}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            aria-label="Close sidebar"
            className="absolute inset-0 bg-ink-900/40"
            onClick={onClose}
          />
          <aside className="absolute left-0 top-0 flex h-full w-64 flex-col bg-paper-panel px-3 py-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between px-2">
              <span className="font-display text-sm font-semibold text-ink-900">
                Menu
              </span>
              <button aria-label="Close" onClick={onClose}>
                <X className="h-5 w-5 text-ink-700" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">{linkList}</div>
            {userSection}
          </aside>
        </div>
      )}
    </>
  );
}