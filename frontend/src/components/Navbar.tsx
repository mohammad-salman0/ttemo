"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { TrendingUp } from "lucide-react"
import ThemeToggle from "./ThemeToggle"

const navLinks = [
  { name: "Home",    href: "/" },
  { name: "About",   href: "/about" },
  { name: "Support", href: "/support" },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "var(--bg-surface)", borderBottom: "1px solid var(--border)",
      boxShadow: "var(--shadow-sm)",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--accent-teal)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <TrendingUp size={17} color="#fff" />
          </div>
          <span style={{ fontSize: 16, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.3px", fontFamily: "'Barlow', sans-serif" }}>
            TWIN<span style={{ color: "var(--accent-teal)" }}>TRADE</span>
          </span>
        </Link>

        {/* Links */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} style={{
              fontSize: 14, fontWeight: 500, textDecoration: "none",
              color: pathname === link.href ? "var(--accent-teal)" : "var(--text-secondary)",
              borderBottom: pathname === link.href ? "2px solid var(--accent-teal)" : "2px solid transparent",
              paddingBottom: 2, transition: "color 0.15s",
            }}>
              {link.name}
            </Link>
          ))}
        </div>

        {/* Auth */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <ThemeToggle />
          <Link href="/login">
            <button className="btn-ghost" style={{ padding: "8px 16px", fontSize: 13 }}>Login</button>
          </Link>
          <Link href="/signup">
            <button className="btn-primary" style={{ padding: "8px 16px", fontSize: 13 }}>Get Started</button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
