"use client";
import { useLang } from "@/lib/LangContext";
import SectionBg from "@/components/SectionBg";
import type { MouseEvent } from "react";

/* ── Animated SVG icons ────────────────────────────────────────
   stroke-dashoffset animates from 120→0 when .in-view is added
   to parent .reveal — see globals.css .reveal.in-view .icon-draw
──────────────────────────────────────────────────────────────── */
const icons = [
  <svg key="dev" className="icon-draw" width="26" height="26" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>,
  <svg key="int" className="icon-draw" width="26" height="26" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>,
  <svg key="ai" className="icon-draw" width="26" height="26" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.26A7 7 0 0 1 12 2z"/>
    <line x1="10" y1="20" x2="14" y2="20"/><line x1="10" y1="22" x2="14" y2="22"/>
  </svg>,
  <svg key="sup" className="icon-draw" width="26" height="26" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>,
];

const iconColors = ["var(--primary)", "var(--secondary)", "var(--primary)", "var(--secondary)"];

function useTilt(maxDeg = 10) {
  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r  = el.getBoundingClientRect();
    const x  = (e.clientX - r.left) / r.width  - 0.5;
    const y  = (e.clientY - r.top)  / r.height - 0.5;
    /* spotlight */
    el.style.setProperty("--mx", `${((x + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${((y + 0.5) * 100).toFixed(1)}%`);
    /* tilt */
    el.style.transform = `perspective(900px) rotateY(${x * maxDeg}deg) rotateX(${-y * maxDeg}deg) translateZ(6px)`;
    el.style.transition = "transform 0.08s ease";
  };
  const handleLeave = (e: MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = "";
    e.currentTarget.style.transition = "transform 0.50s cubic-bezier(0.23,1,0.32,1)";
  };
  return { onMouseMove: handleMove, onMouseLeave: handleLeave };
}

export default function Services() {
  const { t } = useLang();
  const s = t.services;
  const tilt = useTilt(10);

  return (
    <section id="services" className="py-20 md:py-28 px-6 md:px-14 relative" aria-labelledby="services-heading">
      <SectionBg />
      <div className="relative z-[1] max-w-[1200px] mx-auto">
        <div className="mb-14 reveal">
          <span className="section-label">{s.label ?? "Что мы делаем"}</span>
          <h2 id="services-heading" className="mb-4">{s.heading}</h2>
          <p className="max-w-[480px]">{s.sub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
          {s.items.map((item, i) => (
            <article
              key={i}
              className={`rounded-card spotlight-card reveal reveal-delay-${i + 1} flex flex-col p-5 sm:p-7 cursor-default`}
              style={{ willChange: "transform" }}
              {...tilt}
            >
              {/* Icon with draw-on-reveal */}
              <div
                className="mb-5 w-11 h-11 rounded-xl flex items-center justify-center"
                style={{
                  background: i % 2 === 0 ? "rgba(16,185,129,0.12)" : "rgba(167,139,250,0.12)",
                  color: iconColors[i],
                }}
              >
                {icons[i]}
              </div>

              <h3 className="mb-3" style={{ fontSize: "1.1rem" }}>{item.title}</h3>
              <p className="flex-1" style={{ fontSize: "0.92rem", color: "var(--muted)" }}>{item.desc}</p>

              <div className="flex flex-wrap gap-2 mt-5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 11, padding: "4px 10px", borderRadius: 50,
                      background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)",
                      color: "var(--muted)", fontFamily: "var(--font-mono)", letterSpacing: "0.03em",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
