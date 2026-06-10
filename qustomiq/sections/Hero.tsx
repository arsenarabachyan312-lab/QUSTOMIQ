"use client";

import type { ReactNode } from "react";
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

type PlanetStyle = { bg: string; border: string; shadow: string; color: string };
const PLANET_COLORS: Record<string, PlanetStyle> = {
  API:    { bg: "radial-gradient(circle at 38% 32%, #E85520, #C1440E)", border: "rgba(193,68,14,0.7)",   shadow: "0 0 12px rgba(193,68,14,0.3)",   color: "#F0EEE8" },
  AI:     { bg: "radial-gradient(circle at 38% 32%, #7B9FE4, #5B7FD4)", border: "rgba(91,127,212,0.7)",  shadow: "0 0 12px rgba(91,127,212,0.3)",  color: "#F0EEE8" },
  CRM:    { bg: "radial-gradient(circle at 38% 32%, #D4A050, #C88B3A)", border: "rgba(200,139,58,0.7)",  shadow: "0 0 12px rgba(200,139,58,0.3)",  color: "#F0EEE8" },
  ERP:    { bg: "radial-gradient(circle at 38% 32%, #E8DEC5, #D4C5A9)", border: "rgba(212,197,169,0.7)", shadow: "0 0 12px rgba(212,197,169,0.2)", color: "#0D1B2A" },
  WEB:    { bg: "radial-gradient(circle at 38% 32%, #35A0C8, #1E88B4)", border: "rgba(30,136,180,0.7)",  shadow: "0 0 12px rgba(30,136,180,0.3)",  color: "#F0EEE8" },
  MOBILE: { bg: "radial-gradient(circle at 38% 32%, #F0B864, #E8A44A)", border: "rgba(232,164,74,0.7)",  shadow: "0 0 12px rgba(232,164,74,0.3)",  color: "#0D1B2A" },
  B2B:    { bg: "radial-gradient(circle at 38% 32%, #254A78, #1B3A5C)", border: "rgba(27,58,92,0.8)",    shadow: "0 0 12px rgba(27,58,92,0.4)",    color: "#F0EEE8" },
  SFA:    { bg: "radial-gradient(circle at 38% 32%, #D4B870, #C2A35D)", border: "rgba(194,163,93,0.7)",  shadow: "0 0 12px rgba(194,163,93,0.3)",  color: "#0D1B2A" },
  DMS:    { bg: "radial-gradient(circle at 38% 32%, #7EDDD8, #4ECDC4)", border: "rgba(78,205,196,0.7)",  shadow: "0 0 12px rgba(78,205,196,0.3)",  color: "#0D1B2A" },
  TLS:    { bg: "radial-gradient(circle at 38% 32%, #5577EE, #3B5BDB)", border: "rgba(59,91,219,0.7)",   shadow: "0 0 12px rgba(59,91,219,0.3)",   color: "#F0EEE8" },
  "1С":   { bg: "radial-gradient(circle at 38% 32%, #EF5350, #E53935)", border: "rgba(229,57,53,0.7)",   shadow: "0 0 12px rgba(229,57,53,0.3)",   color: "#F0EEE8" },
};

const PLANET_ICONS: Record<string, ReactNode> = {
  /* 1С — красный прямоугольник #C8102E, белый жирный "1С" по центру */
  "1С": (
    <svg viewBox="0 0 36 36" width="32" height="32" aria-hidden="true">
      <rect width="36" height="36" rx="5" fill="#C8102E"/>
      <text x="18" y="26" textAnchor="middle" fill="white" fontSize="20" fontWeight="900" fontFamily="Arial Black,Arial,sans-serif">1С</text>
    </svg>
  ),
  /* CRM — Bitrix24: оранжевый круг, белая жирная "B" */
  CRM: (
    <svg viewBox="0 0 36 36" width="32" height="32" aria-hidden="true">
      <circle cx="18" cy="18" r="17" fill="#FF5A00"/>
      <text x="18.5" y="26" textAnchor="middle" fill="white" fontSize="24" fontWeight="900" fontFamily="Arial Black,Arial,sans-serif">B</text>
    </svg>
  ),
  /* ERP — SAP: белый прямоугольник, синий текст "SAP" Arial Bold — overflow hidden чтобы текст не вылезал */
  ERP: (
    <svg viewBox="0 0 36 36" width="32" height="32" aria-hidden="true" style={{ overflow: "hidden" }}>
      <rect width="36" height="36" rx="4" fill="white"/>
      <text x="18" y="24" textAnchor="middle" fill="#0070F2" fontSize="15" fontWeight="700" fontFamily="Arial,sans-serif">SAP</text>
    </svg>
  ),
  /* API — Swagger: зелёный шестиугольник + белые фигурные скобки (строки, не объект) */
  API: (
    <svg viewBox="0 0 36 40" width="30" height="32" aria-hidden="true">
      <polygon points="18,1 33,10 33,29 18,38 3,29 3,10" fill="#85EA2D"/>
      <text x="18" y="27" textAnchor="middle" fill="white" fontSize="16" fontWeight="900" fontFamily="Arial Black,Arial,sans-serif">{"{ }"}</text>
    </svg>
  ),
  /* WEB — React: тёмный фон #20232A, голубой атом #61DAFB */
  WEB: (
    <svg viewBox="0 0 36 36" width="32" height="32" aria-hidden="true">
      <rect width="36" height="36" rx="5" fill="#20232A"/>
      <circle cx="18" cy="18" r="3" fill="#61DAFB"/>
      <ellipse cx="18" cy="18" rx="14" ry="5" fill="none" stroke="#61DAFB" strokeWidth="1.6"/>
      <ellipse cx="18" cy="18" rx="14" ry="5" fill="none" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(60 18 18)"/>
      <ellipse cx="18" cy="18" rx="14" ry="5" fill="none" stroke="#61DAFB" strokeWidth="1.6" transform="rotate(120 18 18)"/>
    </svg>
  ),
  /* MOBILE — зелёный круг #3DDC84, белый текст "MOB" */
  MOBILE: (
    <svg viewBox="0 0 36 36" width="32" height="32" aria-hidden="true">
      <circle cx="18" cy="18" r="17" fill="#3DDC84"/>
      <text x="18" y="23" textAnchor="middle" fill="white" fontSize="13" fontWeight="900" fontFamily="Arial Black,Arial,sans-serif">MOB</text>
    </svg>
  ),
  /* B2B — тёмно-синий круг #1B3A5C, две белые фигуры людей (группа/команда) */
  B2B: (
    <svg viewBox="0 0 36 36" width="32" height="32" aria-hidden="true">
      <circle cx="18" cy="18" r="17" fill="#1B3A5C"/>
      {/* Левый человек — голова */}
      <circle cx="12" cy="13" r="4.5" fill="white"/>
      {/* Левый человек — тело */}
      <path d="M4 31 Q4 21 12 21 Q20 21 20 31" fill="white"/>
      {/* Правый человек — голова */}
      <circle cx="24" cy="13" r="4.5" fill="white"/>
      {/* Правый человек — тело */}
      <path d="M16 31 Q16 21 24 21 Q32 21 32 31" fill="white"/>
    </svg>
  ),
  /* TLS — Телеагенты: тёмно-синий круг #1A3A6B + белая гарнитура */
  TLS: (
    <svg viewBox="0 0 36 36" width="32" height="32" aria-hidden="true">
      <circle cx="18" cy="18" r="17" fill="#1A3A6B"/>
      {/* Дуга оголовья */}
      <path d="M9 21 Q9 9 18 9 Q27 9 27 21" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Левый наушник */}
      <rect x="7" y="20" width="5" height="8" rx="2.5" fill="white"/>
      {/* Правый наушник */}
      <rect x="24" y="20" width="5" height="8" rx="2.5" fill="white"/>
      {/* Микрофон (рычаг + капсула) */}
      <path d="M12 27 Q11 32 16 32" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="16" cy="32" r="2" fill="white"/>
    </svg>
  ),
  /* SFA — amoCRM: фиолетовый #5B4CE4 круг, белый "amo" */
  SFA: (
    <svg viewBox="0 0 36 36" width="32" height="32" aria-hidden="true">
      <circle cx="18" cy="18" r="17" fill="#5B4CE4"/>
      <text x="18" y="22" textAnchor="middle" fill="white" fontSize="11" fontWeight="700" fontFamily="Arial,sans-serif" letterSpacing="0.5">amo</text>
    </svg>
  ),
  /* AI — белый круг + чёрный жирный текст "AI" */
  AI: (
    <svg viewBox="0 0 36 36" width="32" height="32" aria-hidden="true">
      <circle cx="18" cy="18" r="17" fill="white"/>
      <text x="18" y="25" textAnchor="middle" fill="black" fontSize="18" fontWeight="900" fontFamily="Arial Black,Arial,sans-serif">AI</text>
    </svg>
  ),
  /* DMS — Microsoft: 4 цветных квадрата Windows */
  DMS: (
    <svg viewBox="0 0 36 36" width="30" height="30" aria-hidden="true">
      <rect x="1"  y="1"  width="16" height="16" rx="1" fill="#F25022"/>
      <rect x="19" y="1"  width="16" height="16" rx="1" fill="#7FBA00"/>
      <rect x="1"  y="19" width="16" height="16" rx="1" fill="#00A4EF"/>
      <rect x="19" y="19" width="16" height="16" rx="1" fill="#FFB900"/>
    </svg>
  ),
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

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_620px] items-center px-6 md:px-14 gap-8 lg:gap-12 py-8 lg:py-0">
          {/* Left column */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-[9px] px-4 py-2 rounded-pill bg-[var(--panel)] border border-[var(--line)] text-[13.5px] font-medium text-accent-ink mb-7 whitespace-nowrap">
              <span
                className="w-[7px] h-[7px] rounded-full bg-accent animate-pulse shrink-0"
                style={{ boxShadow: "0 0 0 4px rgba(248,169,31,.35)" }}
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
            <div className="flex flex-col sm:flex-row gap-3 mt-9">
              <a
                href="#contacts"
                className="bg-accent text-[#1C0D08] px-[28px] py-[16px] rounded-btn text-[15.5px] font-semibold no-underline border-0 outline-none hover:bg-accent-deep transition-colors min-h-[52px] flex items-center justify-center sm:justify-start"
              >
                {h.cta_primary}
              </a>
              <a
                href="#services"
                className="text-ink px-6 py-[16px] text-[15.5px] font-semibold no-underline hover:opacity-70 transition-opacity min-h-[52px] flex items-center justify-center sm:justify-start border border-[var(--line)] rounded-btn sm:border-0"
              >
                {h.cta_secondary}
              </a>
            </div>
          </div>

          {/* Right column — solar system */}
          <div
            className="relative h-[320px] sm:h-[520px] lg:h-[680px] flex items-center justify-center overflow-hidden"
            aria-hidden="true"
            style={{
              transform: "perspective(1000px) rotateX(5deg)",
              filter: "drop-shadow(0 30px 60px rgba(236,100,38,0.5))",
            }}
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
                      {/* Counter-rotate to keep icon upright */}
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
                          color: pc.color,
                          animationName: orbit.cw ? "orbit-ccw" : "orbit-cw",
                          animationDuration: orbit.dur,
                          animationTimingFunction: "linear",
                          animationIterationCount: "infinite",
                        }}
                      >
                        {/* Кольцо вокруг планеты (Сатурн-стиль):
                            rotate(20 - angle) = 20° наклон в мировом пространстве.
                            Математика: orbit(+R) + wrap(+angle) + inner(-R) + ring(20-angle) = 20° */}
                        <span
                          aria-hidden="true"
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            width: "calc(100% + 16px)",
                            height: "8px",
                            border: "1.5px solid rgba(248,169,31,0.4)",
                            borderRadius: "50%",
                            transform: `translate(-50%, -50%) rotate(${20 - angle}deg)`,
                            pointerEvents: "none",
                            zIndex: 0,
                          }}
                        />
                        {/* rotate(-angle) отменяет статичный угол позиционирования planet-wrap */}
                        <span style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center", transform: `rotate(${-angle}deg)` }}>
                          {PLANET_ICONS[tag] ?? tag}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}

            {/* Q ring — "солнце" в центре */}
            <div
              className="relative z-10 w-[160px] h-[160px] sm:w-[280px] sm:h-[280px] lg:w-[360px] lg:h-[360px] rounded-full p-[13px] sm:p-[25px] lg:p-[30px] animate-qfloat"
              style={{
                background: "conic-gradient(from 315deg, #FFD580 0deg, #F8A91F 55deg, #EC6426 105deg, #C05A15 150deg, #8B3A1A 180deg, #A84A20 215deg, #EC6426 270deg, #F8A91F 315deg, #FFD580 360deg)",
                boxShadow: "inset 0 4px 16px rgba(0,0,0,0.70), inset 0 -2px 8px rgba(0,0,0,0.40), 0 20px 40px rgba(236,100,38,0.80), 0 0 60px rgba(248,169,31,0.40)",
                filter: "drop-shadow(0 20px 40px rgba(236,100,38,0.8)) drop-shadow(0 0 60px rgba(248,169,31,0.4))",
              }}
            >
              {/* Q tail */}
              <span
                className="absolute rounded-[15px] w-[42px] h-[11px] sm:w-[76px] sm:h-[20px] lg:w-[98px] lg:h-[26px] bottom-[11px] sm:bottom-[21px] lg:bottom-[26px] right-[10px] sm:right-[19px] lg:right-[24px]"
                style={{
                  transform: "rotate(45deg)",
                  background: "linear-gradient(90deg, #FFB84D 0%, #F8A91F 40%, #8B3A1A 100%)",
                  boxShadow: "0 4px 12px rgba(99,39,19,0.50), inset 0 1px 0 rgba(255,200,100,0.30)",
                }}
              />
              {/* Inner dark circle + solar core */}
              <div
                className="w-full h-full rounded-full overflow-hidden"
                style={{
                  background: "radial-gradient(circle at 50% 40%, #1a0800 60%, #3D1500 100%)",
                  boxShadow: "inset 0 4px 20px rgba(0,0,0,0.80), inset 0 -2px 10px rgba(61,21,0,0.50)",
                  border: "1.5px solid #4A1E0D",
                }}
              >
                <QCore />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
