"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ru } from "@/lib/i18n/ru";
import { EASE_OUT } from "@/lib/animations";

type IconKey = "sfa" | "dms" | "ai" | "portal" | "api" | "bi";

const ICONS: Record<IconKey, JSX.Element> = {
  sfa: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  ),
  dms: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <line x1="10" y1="9" x2="8" y2="9"/>
    </svg>
  ),
  ai: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.26A7 7 0 0 1 12 2z"/>
      <line x1="10" y1="20" x2="14" y2="20"/>
      <line x1="10" y1="22" x2="14" y2="22"/>
    </svg>
  ),
  portal: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  api: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  ),
  bi: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
};

const ICON_COLORS: IconKey[] = ["sfa", "dms", "ai", "portal", "api", "bi"];

export default function Services() {
  const reduce = useReducedMotion();
  const { eyebrow, heading, more, items } = ru.services;

  return (
    <section
      id="services"
      style={{
        paddingBlock: "var(--section-py)",
        background: "var(--obsidian)",
      }}
    >
      <div className="q-container">
        {/* Header */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.65, ease: EASE_OUT }}
          style={{ marginBottom: "clamp(3rem, 6vw, 4.5rem)" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{
              width: 24, height: 2,
              background: "var(--g-em)",
              borderRadius: 1,
              flexShrink: 0,
            }} />
            <span className="eyebrow">{eyebrow}</span>
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>{heading}</h2>
        </motion.div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
            gap: "1.25rem",
          }}
        >
          {items.map((item, i) => {
            const iconKey = ICON_COLORS[i] as IconKey;
            const isEven  = i % 2 === 0;

            return (
              <motion.article
                key={i}
                initial={reduce ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                transition={{ duration: 0.6, ease: EASE_OUT, delay: (i % 2) * 0.08 }}
                whileHover={reduce ? {} : {
                  y: -4,
                  boxShadow: isEven
                    ? "0 0 32px rgba(16,185,129,0.13), 0 20px 40px rgba(0,0,0,0.4)"
                    : "0 0 32px rgba(167,139,250,0.13), 0 20px 40px rgba(0,0,0,0.4)",
                }}
                className="q-card"
                style={{
                  cursor: "default",
                  display: "flex",
                  flexDirection: "column",
                  transition: "border-color 0.25s ease, background 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = isEven
                    ? "rgba(16,185,129,0.28)"
                    : "rgba(167,139,250,0.28)";
                  el.style.background = "var(--surface2)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border)";
                  el.style.background  = "var(--surface)";
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: 44, height: 44,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                    background: isEven
                      ? "rgba(16,185,129,0.10)"
                      : "rgba(167,139,250,0.10)",
                    color: isEven ? "var(--emerald)" : "var(--violet)",
                  }}
                >
                  {ICONS[iconKey]}
                </div>

                <h3 style={{ fontSize: "1.05rem", marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--mist)", lineHeight: 1.7, flex: 1 }}>
                  {item.desc}
                </p>

                <div style={{ marginTop: 20 }}>
                  <span
                    style={{
                      fontSize: 13,
                      color: isEven ? "var(--emerald)" : "var(--violet)",
                      fontWeight: 500,
                      cursor: "pointer",
                      borderBottom: "1px solid transparent",
                      transition: "border-color 0.2s",
                      paddingBottom: 1,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderBottomColor = isEven
                        ? "var(--emerald)"
                        : "var(--violet)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderBottomColor = "transparent";
                    }}
                  >
                    {more}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
