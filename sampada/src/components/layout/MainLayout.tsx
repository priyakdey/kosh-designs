import type { ReactNode } from "react";
import { Outlet } from "@tanstack/react-router";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useUIStore } from "@/stores/uiStore";

export function MainLayout({ children }: { children?: ReactNode }) {
  const sidebarCollapsed = useUIStore((s) => s.sidebarCollapsed);

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen text-gray-900 dark:text-gray-100 transition-colors">
      <Sidebar />
      <div
        className="transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? "4.5rem" : "18rem" }}
      >
        <Header />
        <main className="p-6">
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  );
}
