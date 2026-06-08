"use client";

import dynamic from "next/dynamic";
import { useLang } from "@/lib/LangContext";
import Nav from "@/components/Nav";

const QCore = dynamic(() => import("@/components/QCore"), { ssr: false });

const SATS = [
  { top: "6%", left: "50%", label: "CRM" },
  { top: "50%", left: "95%", label: "1С" },
  { top: "94%", left: "50%", label: "ERP" },
  { top: "50%", left: "5%", label: "API" },
];

export default function Hero() {
  const { t } = useLang();
  const h = t.hero;

  return (
    <section
      className="hero-bg min-h-screen flex flex-col"
      aria-labelledby="hero-heading"
    >
      <Nav />

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_620px] items-center px-6 md:px-14 gap-12 py-12 lg:py-0">
        {/* Left column */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-[9px] px-4 py-2 rounded-pill bg-[var(--panel)] border border-[var(--line)] text-[13.5px] font-medium text-accent-ink mb-7 whitespace-nowrap">
            <span
              className="w-[7px] h-[7px] rounded-full bg-accent animate-pulse shrink-0"
              style={{ boxShadow: "0 0 0 4px rgba(34,211,238,.25)" }}
              aria-hidden="true"
            />
            {h.badge}
          </div>

          {/* H1 */}
          <h1
            id="hero-heading"
            className="font-display font-bold text-[clamp(48px,8vw,72px)] leading-[.98] tracking-[-2.5px] m-0"
          >
            {h.h1_before}
            <br />
            {h.h1_line2_pre}
            <span className="text-accent-deep">{h.h1_accent}</span>
          </h1>

          {/* Subheading */}
          <p className="text-[18.5px] leading-[1.6] text-muted mt-6 max-w-[460px]">
            {h.sub}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mt-9 items-center">
            <a
              href="#contacts"
              className="bg-ink text-white dark:text-[#070b10] px-[30px] py-[17px] rounded-btn text-[15.5px] font-semibold no-underline hover:opacity-80 transition-opacity whitespace-nowrap min-h-[52px] flex items-center"
            >
              {h.cta_primary}
            </a>
            <a
              href="#services"
              className="text-ink px-6 py-[17px] text-[15.5px] font-semibold no-underline hover:opacity-70 transition-opacity whitespace-nowrap min-h-[52px] flex items-center"
            >
              {h.cta_secondary}
            </a>
          </div>
        </div>

        {/* Right column — Q-Core stage */}
        <div
          className="relative h-[420px] lg:h-[560px] flex items-center justify-center"
          aria-hidden="true"
        >
          {/* Orbit ring */}
          <div className="absolute w-[420px] h-[420px] lg:w-[560px] lg:h-[560px] animate-qspin">
            {SATS.map((s) => (
              <div
                key={s.label}
                className="absolute animate-qspinrev"
                style={{ top: s.top, left: s.left }}
              >
                <span className="px-[15px] py-2 rounded-pill bg-white dark:bg-white/10 shadow-card border border-[rgba(12,17,22,0.06)] dark:border-white/10 text-[13px] font-semibold font-mono text-ink whitespace-nowrap">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Q ring */}
          <div
            className="relative w-[280px] h-[280px] lg:w-[360px] lg:h-[360px] rounded-full border-[30px] border-ink flex items-center justify-center animate-qfloat"
            style={{ position: "relative" }}
          >
            {/* Q tail */}
            <span
              className="absolute bg-ink rounded-[15px]"
              style={{
                width: 120,
                height: 30,
                bottom: -6,
                right: -10,
                transform: "rotate(45deg)",
              }}
            />
            {/* Neural core */}
            <div className="w-[220px] h-[220px] lg:w-[300px] lg:h-[300px] rounded-full overflow-hidden">
              <QCore />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
