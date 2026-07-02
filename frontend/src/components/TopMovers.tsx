"use client"

import Link from "next/link"
import { ArrowUpRight, TrendingUp } from "lucide-react"

const stocks = [
  { symbol:"INFY",     company:"Infosys",             change:"+3.2%", price:"1,842" },
  { symbol:"TCS",      company:"Tata Consultancy",     change:"+2.7%", price:"3,412" },
  { symbol:"RELIANCE", company:"Reliance Industries",  change:"+1.9%", price:"2,841" },
  { symbol:"WIPRO",    company:"Wipro",                change:"+1.4%", price:"521" },
]

export default function TopMovers() {
  return (
    <div style={{ background:"var(--bg-surface)", border:"1px solid var(--border)", borderRadius:12, boxShadow:"var(--shadow-sm)", overflow:"hidden" }}>
      {/* Header */}
      <div style={{ padding:"16px 20px", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <TrendingUp size={15} color="var(--up)" />
          <span style={{ fontSize:14, fontWeight:700, color:"var(--text-primary)" }}>Top Movers</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <span className="live-dot" style={{ width:7, height:7, borderRadius:"50%", background:"var(--up)", display:"inline-block" }}/>
          <span style={{ fontSize:11, color:"var(--text-muted)", fontFamily:"'JetBrains Mono', monospace" }}>LIVE</span>
        </div>
      </div>

      {stocks.map((s, i) => (
        <Link key={s.symbol} href={`/stocks/${s.symbol}`} style={{ textDecoration:"none" }}>
          <div style={{
            display:"flex", alignItems:"center", justifyContent:"space-between",
            padding:"13px 20px", borderBottom: i<stocks.length-1 ? "1px solid var(--border)" : "none",
            transition:"background 0.12s", cursor:"pointer",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--bg-hover)" }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent" }}
          >
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:36, height:36, borderRadius:8, background:"var(--up-bg)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ fontSize:10, fontWeight:800, color:"var(--up)", fontFamily:"'JetBrains Mono', monospace" }}>{s.symbol.slice(0,2)}</span>
              </div>
              <div>
                <p style={{ fontSize:13, fontWeight:700, color:"var(--text-primary)" }}>{s.symbol}</p>
                <p style={{ fontSize:11, color:"var(--text-muted)", marginTop:1 }}>{s.company}</p>
              </div>
            </div>
            <div style={{ textAlign:"right" }}>
              <p style={{ fontSize:13, fontWeight:800, color:"var(--text-primary)", fontFamily:"'JetBrains Mono', monospace" }}>₹{s.price}</p>
              <p style={{ fontSize:12, fontWeight:700, color:"var(--up)", display:"flex", alignItems:"center", gap:2, justifyContent:"flex-end", marginTop:2 }}>
                <ArrowUpRight size={12}/>{s.change}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
