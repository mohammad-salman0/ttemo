"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const pillars = [
  "AAOIFI-compliant Shariah screening",
  "AI-driven portfolio intelligence",
  "Real-time halal certification alerts",
]

const values = [
  {
    num: "01",
    title: "Integrity",
    desc: "Every screening decision is grounded in authentic Shariah scholarship and transparent methodology.",
  },
  {
    num: "02",
    title: "Innovation",
    desc: "Cutting-edge AI models continuously refine our halal stock analysis and portfolio recommendations.",
  },
  {
    num: "03",
    title: "Accessibility",
    desc: "Bringing institutional-grade ethical investing tools to everyday Muslim investors worldwide.",
  },
]

const stats = [
  { value: "AAOIFI", label: "Standards" },
  { value: "AI", label: "Powered" },
  { value: "100%", label: "Halal Focus" },
]

const team = [
  {
    initials: "MS",
    name: "Mohammad Salman",
    role: "Founder & Vision Lead",
    bio: "Focused on building ethical financial technology that bridges modern investing with Islamic financial values.",
    photo: "/media/salman.JPG",
  },
  {
    initials: "DF",
    name: "Dawar Farooq",
    role: "Lead Developer",
    bio: "Responsible for the AI-powered halal screening engine, secure backend systems, and real-time fintech infrastructure.",
    photo: "/media/Dawar.JPG",
  },
]

export default function About() {
  return (
    <div className="bg-[#FAFAF7]  text-[#1a1a14] overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="py-20 px-6 max-w-[820px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-[#E8F5EE] text-[#2D6A4F] text-[11px] font-medium tracking-[0.1em] uppercase px-4 py-1.5 rounded-full border border-[#B7DFC9] mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F]" />
          Ethical AI Investing Platform
        </div>

        <h1 className="text-[64px] lg:text-[76px] leading-[1.05] tracking-[-0.01em] text-[#1a1a14] mb-6">
          About <em className="not-italic text-[#2D6A4F]">Twin</em>Trade
        </h1>

        <div className="w-10 h-px bg-[#2D6A4F] mx-auto my-8" />

        <p className="text-[15px] leading-[1.85] text-[#666] max-w-[520px] mx-auto">
          Combining ethical investing, artificial intelligence, and halal stock
          screening into one powerful fintech platform designed for the modern
          investor.
        </p>
      </section>

      {/* ── PLATFORM ── */}
      <section className="py-16 px-6 max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-20 items-center">
        {/* Left */}
        <div>
          <p className="text-[10px] font-medium tracking-[0.14em] uppercase text-[#2D6A4F] mb-5">
            Our Platform
          </p>
          <h2 className="text-[42px] leading-[1.15] text-[#1a1a14] mb-8">
            Building the Future of Ethical Investing
          </h2>
          <div className="space-y-5 text-[14px] leading-[1.9] text-[#666]">
            <p>
              TwinTrade helps investors discover halal investment opportunities
              through advanced Shariah screening and AI-driven financial analysis.
            </p>
            <p>
              Our platform evaluates companies using AAOIFI standards, sector
              analysis, and intelligent portfolio insights — making ethical
              investing more accessible and technologically advanced.
            </p>
          </div>
          <ul className="mt-8 space-y-3">
            {pillars.map((p) => (
              <li key={p} className="flex items-center gap-3 text-[13px] text-[#444]">
                <span className="w-2 h-2 rounded-full bg-[#2D6A4F] shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Right — swap the div for <img> once assets load */}
        <div className="relative">
          <img
            src="/media/shakinghands.jpg"
            alt="TwinTrade partnership"
            className="w-full aspect-[4/5] object-cover rounded-[4px] border border-[#B7DFC9]"
          />
          <div className="absolute -bottom-3.5 -right-3.5 bg-[#1a1a14] text-[#FAFAF7] text-[11px] tracking-[0.06em] px-4 py-2 rounded-[2px]">
            Est. 2024
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="bg-[#1a1a14] py-20 px-6 text-center">
        <p className="text-[10px] font-medium tracking-[0.14em] uppercase text-[#5FA882] mb-6">
          Mission
        </p>
        <h2 className="text-[48px] lg:text-[56px] text-[#FAFAF7] leading-[1.2] max-w-[680px] mx-auto mb-0">
          Empowering investors with{" "}
          <em className="not-italic text-[#5FA882]">purpose</em>
        </h2>
        <div className="w-px h-12 bg-white/10 mx-auto my-8" />
        <p className="text-[14px] leading-[1.9] text-white/50 max-w-[520px] mx-auto">
          To empower Muslim investors worldwide with intelligent financial tools
          that align with Islamic principles while leveraging the power of modern
          AI and fintech innovation.
        </p>

        {/* Stats grid */}
        <div
          className="grid grid-cols-3 max-w-[600px] mx-auto mt-12"
          style={{ borderTop: "0.5px solid rgba(250,250,247,0.1)", borderLeft: "0.5px solid rgba(250,250,247,0.1)" }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="py-6"
              style={{ borderRight: "0.5px solid rgba(250,250,247,0.1)", borderBottom: "0.5px solid rgba(250,250,247,0.1)" }}
            >
              <span className="text-[32px] text-[#FAFAF7] block">
                {s.value}
              </span>
              <span className="text-[10px] tracking-[0.08em] uppercase text-white/30 mt-1 block">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="bg-[#F0F4F1] py-16 px-6">
        <div className="max-w-[1100px] mx-auto">
          <p className="text-[10px] font-medium tracking-[0.14em] uppercase text-[#2D6A4F] mb-8">
            Core Values
          </p>
          <div className="grid md:grid-cols-3 gap-px">
            {values.map((v) => (
              <div key={v.num} className="bg-white border border-black/[0.06] p-10">
                <div className="text-[52px] text-[#D4EBE0] leading-none mb-4">
                  {v.num}
                </div>
                <h3 className="text-[14px] font-medium text-[#1a1a14] mb-3 tracking-[0.02em]">
                  {v.title}
                </h3>
                <p className="text-[13px] leading-[1.75] text-[#888]">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-20 px-6 max-w-[1100px] mx-auto">
        <div className="mb-12">
          <p className="text-[10px] font-medium tracking-[0.14em] uppercase text-[#2D6A4F] mb-4">
            The Team
          </p>
          <h2 className="text-[48px] text-[#1a1a14] leading-[1.1]">
            The people building TwinTrade
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-px">
          {team.map((member) => (
            <div
              key={member.name}
              className="bg-white border border-black/[0.08] p-10 flex gap-7 items-start hover:bg-[#F5F5F0] transition-colors duration-200"
            >
              {/* Avatar — shows photo if available, falls back to initials */}
              <div className="shrink-0 w-20 h-20 rounded-full border border-[#B7DFC9] overflow-hidden bg-[#E8F5EE] flex items-center justify-center">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget
                    target.style.display = "none"
                    target.nextElementSibling?.classList.remove("hidden")
                  }}
                />
                <span className="hidden  text-[22px] text-[#2D6A4F]">
                  {member.initials}
                </span>
              </div>

              <div>
                <h3 className="text-[26px] font-normal text-[#1a1a14] mb-1">
                  {member.name}
                </h3>
                <span className="text-[11px] tracking-[0.1em] uppercase text-[#2D6A4F] font-medium block mb-4">
                  {member.role}
                </span>
                <p className="text-[13px] leading-[1.8] text-[#777]">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}