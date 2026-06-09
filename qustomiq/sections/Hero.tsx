"use client";

import dynamic from "next/dynamic";
import { useLang } from "@/lib/LangContext";
import Nav from "@/components/Nav";
import SectionBg from "@/components/SectionBg";

const QCore = dynamic(() => import("@/components/QCore"), { ssr: false });

type OrbitConfig = {
  cls: "orbit-inner" | "orbit-middle" | "orbit-outer";
  dur: string;
  cw: boolean;
  tags: string[];
};

const ORBITS: OrbitConfig[] = [
  { cls: "orbit-inner",  dur: "18s", cw: true,  tags: ["CRM", "AI", "API"] },
  { cls: "orbit-middle", dur: "30s", cw: false, tags: ["ERP", "1С", "WEB", "MOBILE"] },
  { cls: "orbit-outer",  dur: "45s", cw: true,  tags: ["B2B", "TLS", "DMS", "SFA"] },
];

type PlanetStyle = { bg: string; border: string; shadow: string; color: string; ring?: true };
const PLANET_COLORS: Record<string, PlanetStyle> = {
  API:    { bg: "radial-gradient(circle at 38% 32%, #E85520, #C1440E)", border: "rgba(193,68,14,0.7)",   shadow: "0 0 12px rgba(193,68,14,0.3)",   color: "#F0EEE8" },
  AI:     { bg: "radial-gradient(circle at 38% 32%, #7B9FE4, #5B7FD4)", border: "rgba(91,127,212,0.7)",  shadow: "0 0 12px rgba(91,127,212,0.3)",  color: "#F0EEE8" },
  CRM:    { bg: "radial-gradient(circle at 38% 32%, #D4A050, #C88B3A)", border: "rgba(200,139,58,0.7)",  shadow: "0 0 12px rgba(200,139,58,0.3)",  color: "#F0EEE8" },
  ERP:    { bg: "radial-gradient(circle at 38% 32%, #E8DEC5, #D4C5A9)", border: "rgba(212,197,169,0.7)", shadow: "0 0 12px rgba(212,197,169,0.2)", color: "#0D1B2A" },
  WEB:    { bg: "radial-gradient(circle at 38% 32%, #35A0C8, #1E88B4)", border: "rgba(30,136,180,0.7)",  shadow: "0 0 12px rgba(30,136,180,0.3)",  color: "#F0EEE8" },
  MOBILE: { bg: "radial-gradient(circle at 38% 32%, #F0B864, #E8A44A)", border: "rgba(232,164,74,0.7)",  shadow: "0 0 12px rgba(232,164,74,0.3)",  color: "#0D1B2A" },
  B2B:    { bg: "radial-gradient(circle at 38% 32%, #B8B8B8, #9E9E9E)", border: "rgba(158,158,158,0.6)", shadow: "0 0 12px rgba(158,158,158,0.2)", color: "#0D1B2A" },
  SFA:    { bg: "radial-gradient(circle at 38% 32%, #D4B870, #C2A35D)", border: "rgba(194,163,93,0.7)",  shadow: "0 0 12px rgba(194,163,93,0.3)",  color: "#0D1B2A", ring: true },
  DMS:    { bg: "radial-gradient(circle at 38% 32%, #7EDDD8, #4ECDC4)", border: "rgba(78,205,196,0.7)",  shadow: "0 0 12px rgba(78,205,196,0.3)",  color: "#0D1B2A" },
  TLS:    { bg: "radial-gradient(circle at 38% 32%, #5577EE, #3B5BDB)", border: "rgba(59,91,219,0.7)",   shadow: "0 0 12px rgba(59,91,219,0.3)",   color: "#F0EEE8" },
  "1С":   { bg: "radial-gradient(circle at 38% 32%, #EF5350, #E53935)", border: "rgba(229,57,53,0.7)",   shadow: "0 0 12px rgba(229,57,53,0.3)",   color: "#F0EEE8" },
};

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

          {/* Right column — solar system */}
          <div
            className="relative h-[400px] sm:h-[520px] lg:h-[680px] flex items-center justify-center"
            aria-hidden="true"
          >
            {/* Orbit rings with planets */}
            {ORBITS.map((orbit) => (
              <div
                key={orbit.cls}
                className={`orbit-ring ${orbit.cls}`}
                style={{
                  animationName: orbit.cw ? "orbit-cw" : "orbit-ccw",
                  animationDuration: orbit.dur,
                  animationTimingFunction: "linear",
                  animationIterationCount: "infinite",
                }}
              >
                {orbit.tags.map((tag, i) => {
                  const angle = (360 / orbit.tags.length) * i;
                  const pc = PLANET_COLORS[tag] ?? PLANET_COLORS["API"];
                  return (
                    <div
                      key={tag}
                      className="planet-wrap"
                      style={{
                        transform: `rotate(${angle}deg) translateY(calc(-1 * var(--orbit-r)))`,
                      }}
                    >
                      {/* Counter-rotate to keep text upright */}
                      <div
                        className="planet-inner"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                          background: pc.bg,
                          border: `1px solid ${pc.border}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: pc.shadow,
                          letterSpacing: "-0.3px",
                          fontWeight: 700,
                          color: pc.color,
                          fontFamily: "var(--font-mono, monospace)",
                          animationName: orbit.cw ? "orbit-ccw" : "orbit-cw",
                          animationDuration: orbit.dur,
                          animationTimingFunction: "linear",
                          animationIterationCount: "infinite",
                        }}
                      >
                        {/* Saturn ring for SFA */}
                        {pc.ring && (
                          <span
                            aria-hidden="true"
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              width: "155%",
                              height: "8px",
                              transform: "translate(-50%, -50%) rotate(-22deg)",
                              background: "linear-gradient(90deg, transparent 0%, rgba(194,163,93,0.5) 15%, rgba(194,163,93,0.9) 40%, rgba(194,163,93,0.9) 60%, rgba(194,163,93,0.5) 85%, transparent 100%)",
                              borderRadius: "50%",
                              pointerEvents: "none",
                              zIndex: 0,
                            }}
                          />
                        )}
                        <span style={{ position: "relative", zIndex: 1 }}>{tag}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}

            {/* Q ring — "солнце" в центре */}
            <div
              className="relative z-10 w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] lg:w-[360px] lg:h-[360px] rounded-full p-[18px] sm:p-[25px] lg:p-[30px] animate-qfloat"
              style={{
                background: "conic-gradient(from 135deg, #FFD060 0deg, #F0A500 75deg, #D4900A 180deg, #F0A500 285deg, #FFD060 360deg)",
                filter: "drop-shadow(0 0 16px rgba(240,165,0,0.6)) drop-shadow(0 0 4px rgba(240,165,0,0.35))",
              }}
            >
              {/* Q tail */}
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
      </div>
    </section>
  );
}
