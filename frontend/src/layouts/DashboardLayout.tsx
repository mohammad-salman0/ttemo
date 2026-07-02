// src/layouts/DashboardLayout.tsx
// Keep your existing folder structure — no need to move anything
"use client"

import Sidebar from "@/components/Sidebar"
import DashboardNavbar from "@/components/DashboardNavbar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-base)" }}>

      {/* SIDEBAR — sticky, stays visible while page scrolls */}
      <aside style={{
        width: 256,
        flexShrink: 0,
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
        zIndex: 40,
      }}>
        <Sidebar />
      </aside>

      {/* MAIN CONTENT */}
      <div style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}>
        <DashboardNavbar />
        <main style={{ flex: 1, padding: "28px 32px" }}>
          {children}
        </main>
      </div>

    </div>
  )
}
