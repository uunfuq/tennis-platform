import type { ReactNode } from "react";
import Sidebar from "./components/sidebar";
import Topbar from "./components/topbar";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#f5f5f3] text-[#171717]">
      <Sidebar />

      <section className="min-h-screen lg:ml-[270px]">
        <Topbar />

        <div className="min-h-[calc(100vh-73px)] p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </section>
    </main>
  );
}