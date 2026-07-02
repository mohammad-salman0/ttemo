// src/components/Sidebar.tsx
"use client"

import Link from "next/link"
import { LayoutDashboard, LineChart, ShieldCheck, Wallet, Star, Bot, User, LogOut, TrendingUp } from "lucide-react"
import { usePathname } from "next/navigation"
import ThemeToggle from "@/components/ThemeToggle"

const menu = [
  { name: "Dashboard",  href: "/dashboard",  icon: LayoutDashboard },
  { name: "Stocks",     href: "/stocks",      icon: LineChart },
  { name: "Orders",     href: "/orders",      icon: ShieldCheck },
  { name: "Portfolio",  href: "/portfolio",   icon: Wallet },
  { name: "Watchlist",  href: "/watchlist",   icon: Star },
  { name: "AI Advisor", href: "/ai-advisor",  icon: Bot },
  { name: "Profile",    href: "/profile",     icon: User },
]

export default function Sidebar() {
  const pathname = usePathname()

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/login"
  }

  return (
    // Fill the full aside container given by DashboardLayout
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      background: "var(--sidebar-bg)",
      borderRight: "1px solid var(--sidebar-border)",
    }}>

      {/* LOGO */}
      <Link href="/dashboard" style={{ textDecoration: "none" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "18px 20px",
          borderBottom: "1px solid var(--border)",
          cursor: "pointer",
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: 8,
            background: "var(--accent-teal)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <TrendingUp size={18} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.3px", fontFamily: "'Barlow', sans-serif", lineHeight: 1.2 }}>
              TWIN<span style={{ color: "var(--accent-teal)" }}>TRADE</span>
            </div>
            <div style={{ fontSize: 9, color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.08em", marginTop: 2 }}>
              HALAL MARKETS
            </div>
          </div>
        </div>
      </Link>

      {/* NAV LABEL */}
      <div style={{ padding: "16px 20px 6px", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "var(--text-muted)", textTransform: "uppercase" }}>
        Navigation
      </div>

      {/* MENU */}
      <nav style={{ flex: 1, padding: "4px 12px", overflowY: "auto" }}>
        {menu.map(item => {
          const Icon = item.icon
          // Mark active if exact match OR if it's a sub-route (e.g. /stocks/RELIANCE)
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))

          return (
            <Link key={item.name} href={item.href} style={{ textDecoration: "none", display: "block", marginBottom: 2 }}>
              <div
                style={{
                  display: "flex", alignItems: "center", gap: 11,
                  padding: "10px 12px", borderRadius: 8,
                  borderLeft: active ? "2.5px solid var(--accent-teal)" : "2.5px solid transparent",
                  background: active ? "var(--sidebar-active)" : "transparent",
                  color: active ? "var(--accent-teal)" : "var(--text-secondary)",
                  fontWeight: active ? 600 : 500,
                  fontSize: 13.5, transition: "all 0.15s", cursor: "pointer",
                }}
                onMouseEnter={e => {
                  if (!active) {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = "var(--sidebar-hover)"
                    el.style.color = "var(--text-primary)"
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = "transparent"
                    el.style.color = "var(--text-secondary)"
                  }
                }}
              >
                <Icon size={16} />
                <span>{item.name}</span>
              </div>
            </Link>
          )
        })}
      </nav>

      {/* BOTTOM */}
      <div style={{ padding: "12px", borderTop: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 4px" }}>
          <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 500 }}>Theme</span>
          <ThemeToggle />
        </div>
        <button
          onClick={handleLogout}
          style={{
            width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            padding: "10px 0", borderRadius: 8,
            border: "1.5px solid var(--down-border)",
            background: "var(--down-bg)", color: "var(--down)",
            fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "opacity 0.15s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.75" }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1" }}
        >
          <LogOut size={14} /> Logout
        </button>
      </div>
    </div>
  )
}