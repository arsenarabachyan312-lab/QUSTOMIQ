"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/lib/LangContext";
import SectionBg from "@/components/SectionBg";
import DNAHelix from "@/components/DNAHelix";
import type { MouseEvent } from "react";

const icons = [
  <svg key="dev" width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>,
  <svg key="int" width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>,
  <svg key="ai" width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.26A7 7 0 0 1 12 2z"/>
    <line x1="10" y1="20" x2="14" y2="20"/><line x1="10" y1="22" x2="14" y2="22"/>
  </svg>,
  <svg key="sup" width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>,
];

const iconBg    = ["rgba(16,185,129,0.12)", "rgba(167,139,250,0.12)", "rgba(16,185,129,0.12)", "rgba(167,139,250,0.12)"];
const iconColor = ["var(--primary)", "var(--secondary)", "var(--primary)", "var(--secondary)"];
const hoverGlow = [
  "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(16,185,129,0.30)",
  "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(167,139,250,0.30)",
  "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(16,185,129,0.30)",
  "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(167,139,250,0.30)",
];

function useSpotlight() {
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r  = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width  * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top)  / r.height * 100).toFixed(1)}%`);
  };
  return { onMouseMove: onMove };
}

export default function Services() {
  const { t } = useLang();
  const s = t.services;
  const spotlight = useSpotlight();

  const gridRef = useRef(null);
  const inView  = useInView(gridRef, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <section
      id="services"
      className="py-20 md:py-28 px-6 md:px-14 relative overflow-hidden"
      aria-labelledby="services-heading"
    >
      <SectionBg />

      <div className="relative z-[1] max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div style={{
              width: 24, height: 2,
              background: "linear-gradient(90deg,#10B981,#34F5C5)",
              borderRadius: 1,
              flexShrink: 0,
            }} />
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "var(--primary)",
            }}>
              ЧТО МЫ ДЕЛАЕМ
            </span>
          </div>
          <h2 id="services-heading" className="mb-4">{s.heading}</h2>
          <p style={{ color: "var(--muted)", maxWidth: 480 }}>{s.sub}</p>
        </motion.div>

        {/* Cards + DNA helix */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8 xl:gap-14 items-center">
          {/* Card grid */}
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {s.items.map((item, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.09 }}
                whileHover={{ y: -6, boxShadow: hoverGlow[i] }}
                className="spotlight-card flex flex-col cursor-default"
                style={{
                  background: "#0F1115",
                  borderRadius: 22,
                  padding: 32,
                  border: "1px solid var(--border)",
                  willChange: "transform",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseMove={spotlight.onMouseMove}
              >
                {/* Icon */}
                <motion.div
                  className="mb-5 w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: iconBg[i], color: iconColor[i] }}
                  whileHover={{ scale: 1.12 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  {icons[i]}
                </motion.div>

                <h3 className="mb-3" style={{ fontSize: "1.05rem" }}>{item.title}</h3>
                <p className="flex-1" style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.65 }}>
                  {item.desc}
                </p>

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
              </motion.article>
            ))}
          </div>

          {/* DNA Helix — right column, desktop only */}
          <div className="hidden xl:flex items-center justify-center">
            <DNAHelix className="w-[300px] h-[500px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
