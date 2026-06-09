"use client";

import dynamic from "next/dynamic";
import { useLang } from "@/lib/LangContext";
import Nav from "@/components/Nav";
import SectionBg from "@/components/SectionBg";

const QCore = dynamic(() => import("@/components/QCore"), { ssr: false });

// 11 labels evenly distributed on a circle (44% radius from center, starting from top)
// Positions: top% / left% — the center of each pill is at these coordinates
const PILL_BASE =
  "px-[8px] py-[4px] sm:px-[12px] sm:py-1.5 rounded-pill shadow-card border font-semibold font-mono whitespace-nowrap";

// Cycle: amber (dark text) → navy glass → darker navy glass
const PILL_COLORS = [
  "bg-[#F0A500] border-[#D4900A]/60 text-[#0D1B2A]",
  "bg-[#F0EEE8]/[0.08] border-[#F0A500]/[0.2] text-ink",
  "bg-[#F0EEE8]/[0.04] border-[#F0EEE8]/[0.08] text-ink",
];

const SATS = [
  { label: "CRM",    top: "6%",    left: "50%" },
  { label: "1С",     top: "13%",   left: "73.8%" },
  { label: "ERP",    top: "31.7%", left: "90%" },
  { label: "API",    top: "56.2%", left: "93.5%" },
  { label: "AI",     top: "78.8%", left: "83.3%" },
  { label: "SFA",    top: "92.2%", left: "62.4%" },
  { label: "DMS",    top: "92.2%", left: "37.6%" },
  { label: "TLS",    top: "78.8%", left: "16.7%" },
  { label: "B2B",    top: "56.2%", left: "6.5%" },
  { label: "WEB",    top: "31.7%", left: "10%" },
  { label: "MOBILE", top: "13%",   left: "26.2%" },
];

export default function Hero() {
  const { t } = useLang();
  const h = t.hero;

  return (
    <section
      className="hero-bg min-h-screen flex flex-col relative"
      aria-labelledby="hero-heading"
    >
      <SectionBg />

      <div className="relative z-[1] flex flex-col flex-1">
      <Nav />

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_620px] items-center px-6 md:px-14 gap-12 py-12 lg:py-0">
        {/* Left column */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-[9px] px-4 py-2 rounded-pill bg-[var(--panel)] border border-[var(--line)] text-[13.5px] font-medium text-accent-ink mb-7 whitespace-nowrap">
            <span
              className="w-[7px] h-[7px] rounded-full bg-accent animate-pulse shrink-0"
              style={{ boxShadow: "0 0 0 4px rgba(240,165,0,.35)" }}
              aria-hidden="true"
            />
            {h.badge}
          </div>

          {/* H1 */}
          <h1
            id="hero-heading"
            className="font-display font-bold text-[clamp(44px,8vw,72px)] leading-[.98] tracking-[-2.5px] m-0"
          >
            {h.h1_before}
            <br />
            {h.h1_line2_pre}
            <span className="text-accent-deep">{h.h1_accent}</span>
          </h1>

          {/* Subheading */}
          <p className="text-[17px] leading-[1.6] text-muted mt-6 max-w-[460px]">
            {h.sub}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mt-9 items-center">
            <a
              href="#contacts"
              className="bg-accent text-[#0D1B2A] px-[28px] py-[16px] rounded-btn text-[15.5px] font-semibold no-underline border-0 outline-none hover:bg-accent-deep transition-colors whitespace-nowrap min-h-[52px] flex items-center"
            >
              {h.cta_primary}
            </a>
            <a
              href="#services"
              className="text-ink px-6 py-[16px] text-[15.5px] font-semibold no-underline hover:opacity-70 transition-opacity whitespace-nowrap min-h-[52px] flex items-center"
            >
              {h.cta_secondary}
            </a>
          </div>
        </div>

        {/* Right column — Q-Core stage */}
        <div
          className="relative h-[300px] sm:h-[420px] lg:h-[560px] flex items-center justify-center overflow-hidden"
          aria-hidden="true"
        >
          {/* Orbit ring with labels */}
          <div className="absolute w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] lg:w-[560px] lg:h-[560px] animate-qspin">
            {SATS.map((s, i) => (
              <div
                key={s.label}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ top: s.top, left: s.left }}
              >
                <div className="animate-qspinrev">
                  <span className={`${PILL_BASE} ${PILL_COLORS[i % 3]} text-[10px] sm:text-[12px] lg:text-[13px]`}>
                    {s.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

{/* Q ring — conic-gradient engraving, padding = border width */}
          <div
            className="relative w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] lg:w-[360px] lg:h-[360px] rounded-full p-[18px] sm:p-[25px] lg:p-[30px] animate-qfloat"
            style={{
              background: "conic-gradient(from 135deg, #FFD060 0deg, #F0A500 75deg, #D4900A 180deg, #F0A500 285deg, #FFD060 360deg)",
              filter: "drop-shadow(0 0 16px rgba(240,165,0,0.6)) drop-shadow(0 0 4px rgba(240,165,0,0.35))",
            }}
          >
            {/* Q tail — linear gradient light→dark */}
            <span
              className="absolute rounded-[15px] w-[54px] h-[15px] sm:w-[76px] sm:h-[20px] lg:w-[98px] lg:h-[26px] bottom-[14px] sm:bottom-[21px] lg:bottom-[26px] right-[12px] sm:right-[19px] lg:right-[24px]"
              style={{
                transform: "rotate(45deg)",
                background: "linear-gradient(135deg, #FFD060 0%, #F0A500 45%, #D4900A 100%)",
              }}
            />
            {/* Inner navy circle + neural core */}
            <div className="w-full h-full rounded-full overflow-hidden bg-[#0D1B2A]">
              <QCore />
            </div>
          </div>
        </div>
      </div>
      </div>{/* /z-[1] wrapper */}
    </section>
  );
}
