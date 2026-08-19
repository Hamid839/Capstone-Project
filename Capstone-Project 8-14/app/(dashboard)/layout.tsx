"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import DashboardTopbar from "@/components/layout/DashboardTopbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardTopbar onMenuClick={() => setMobileNavOpen(true)} />
      <div className="flex flex-1">
        <Sidebar mobileOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
