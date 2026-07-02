"use client"

import { useEffect, useState } from "react"
import { Search, Bell, User, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"
import api from "@/services/api"
import ThemeToggle from "@/components/ThemeToggle"

type Stock = { symbol: string; companyName: string }

// Ticker data defined once outside the component — no array duplication
const TICKER_ITEMS = [
  { sym: "NIFTY",    val: "+1.24%", up: true  },
  { sym: "SENSEX",   val: "+0.87%", up: true  },
  { sym: "RELIANCE", val: "+2841",  up: true  },
  { sym: "TCS",      val: "-3412",  up: false },
  { sym: "INFY",     val: "+0.45%", up: true  },
  { sym: "HDFC",     val: "+1623",  up: true  },
  { sym: "ITC",      val: "-410",   up: false },
  { sym: "SBI",      val: "+0.63%", up: true  },
  { sym: "BAJFIN",   val: "+6780",  up: true  },
  { sym: "WIPRO",    val: "-521",   up: false },
]

export default function DashboardNavbar() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [stocks, setStocks] = useState<Stock[]>([])
  const [results, setResults] = useState<Stock[]>([])
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    // Search needs a reasonably wide pool of symbols to match against,
    // so request a larger page size here rather than the default 25 —
    // this is a typeahead, not a paginated list view.
    api.get("/stocks", { params: { page: 1, pageSize: 100 } })
      .then(r => setStocks(r.data?.stocks || []))
      .catch(console.log)
  }, [])

  useEffect(() => {
    if (!query) { setResults([]); return }
    setResults(
      stocks
        .filter(s =>
          s.symbol.toLowerCase().includes(query.toLowerCase()) ||
          s.companyName.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 6)
    )
  }, [query, stocks])

  // Navigates to the selected stock. Pulled out so it can be called
  // from onMouseDown (fires before blur) instead of onClick (fires
  // after blur), avoiding the race where the dropdown unmounts via
  // the blur timeout before the click is ever registered.
  const goToStock = (symbol: string) => {
    setQuery("")
    setResults([])
    setFocused(false)
    router.push(`/stocks/${symbol}`)
  }

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
      padding: "10px 24px", background: "var(--bg-surface)", borderBottom: "1px solid var(--border)",
      boxShadow: "var(--shadow-sm)", position: "sticky", top: 0, zIndex: 40,
    }}>

      {/* ── TICKER STRIP ── */}
      <div style={{ flex: 1, overflow: "hidden", maxWidth: 420 }}>
        {/*
          Duplicate the items once in CSS via the animation — NOT via [...Array(2)].
          The ticker-track CSS animation handles the seamless loop by translating -50%,
          so we just need the items listed twice in the DOM with unique keys.
        */}
        <div className="ticker-track" style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}>
          {/* First copy */}
          {TICKER_ITEMS.map((item) => (
            <span key={`a-${item.sym}`} style={{ marginRight: 24, color: item.up ? "var(--up)" : "var(--down)" }}>
              <span style={{ color: "var(--text-secondary)", marginRight: 4 }}>{item.sym}</span>
              {item.val}
            </span>
          ))}
          {/* Second copy — needed for seamless CSS loop */}
          {TICKER_ITEMS.map((item) => (
            <span key={`b-${item.sym}`} style={{ marginRight: 24, color: item.up ? "var(--up)" : "var(--down)" }}>
              <span style={{ color: "var(--text-secondary)", marginRight: 4 }}>{item.sym}</span>
              {item.val}
            </span>
          ))}
        </div>
      </div>

      {/* ── SEARCH ── */}
      <div style={{ position: "relative", width: 280 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "var(--bg-base)",
          border: `1.5px solid ${focused ? "var(--accent-teal)" : "var(--border)"}`,
          borderRadius: 8, padding: "7px 12px", transition: "border-color 0.15s",
        }}>
          <Search size={14} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search stocks..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 180)}
            style={{
              background: "transparent", border: "none", outline: "none",
              fontSize: 13, color: "var(--text-primary)", width: "100%",
            }}
          />
        </div>

        {/* Dropdown results */}
        {focused && results.length > 0 && (
          <div style={{
            position: "absolute", top: "calc(100% + 6px)", left: 0, width: "100%", zIndex: 99,
            background: "var(--bg-elevated)", border: "1px solid var(--border)",
            borderRadius: 10, boxShadow: "var(--shadow-lg)", overflow: "hidden",
          }}>
            {results.map((s, i) => (
              <button
                key={s.symbol}
                // onMouseDown fires BEFORE the input's onBlur, so navigation
                // happens before the dropdown closes / focus is lost.
                // preventDefault stops the click from stealing focus oddly
                // and ensures this fires reliably on the first interaction.
                onMouseDown={(e) => {
                  e.preventDefault()
                  goToStock(s.symbol)
                }}
                style={{
                  width: "100%", textAlign: "left", padding: "10px 14px",
                  borderBottom: i < results.length - 1 ? "1px solid var(--border)" : "none",
                  background: "transparent", border: "none", cursor: "pointer", transition: "background 0.1s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--bg-hover)" }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent" }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", fontFamily: "'JetBrains Mono', monospace" }}>{s.symbol}</div>
                <div style={{ fontSize: 11.5, color: "var(--text-muted)", marginTop: 2 }}>{s.companyName}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── RIGHT ACTIONS ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <ThemeToggle />

        <button style={{
          position: "relative", width: 36, height: 36, borderRadius: 8,
          background: "var(--bg-hover)", border: "1.5px solid var(--border)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: "var(--text-secondary)",
        }}>
          <Bell size={15} />
          <span style={{
            position: "absolute", top: 6, right: 6, width: 7, height: 7,
            borderRadius: "50%", background: "var(--down)",
            border: "1.5px solid var(--bg-surface)",
          }} />
        </button>

        <div style={{
          display: "flex", alignItems: "center", gap: 8, padding: "6px 10px",
          borderRadius: 8, border: "1.5px solid var(--border)",
          background: "var(--bg-hover)", cursor: "pointer",
        }}>
          <div style={{
            width: 26, height: 26, borderRadius: 6, background: "var(--accent-teal)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <User size={14} color="#fff" />
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>Account</span>
          <ChevronDown size={12} color="var(--text-muted)" />
        </div>
      </div>
    </div>
  )
}