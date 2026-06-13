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
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
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
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6"  y1="20" x2="6"  y2="14"/>
    </svg>
  ),
};

const ICON_KEYS: IconKey[] = ["sfa", "dms", "ai", "portal", "api", "bi"];
const CARD_NUMS            = ["01", "02", "03", "04", "05", "06"];

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
          <span className="eyebrow" style={{ marginBottom: 16 }}>{eyebrow}</span>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              letterSpacing: "-0.02em",
            }}
          >
            {heading}
          </h2>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={reduce ? {} : {
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
            gap: "1.25rem",
          }}
        >
          {items.map((item, i) => {
            const iconKey = ICON_KEYS[i];
            const isEven  = i % 2 === 0;

            return (
              <motion.article
                key={i}
                variants={reduce ? {} : {
                  hidden:   { opacity: 0, y: 24 },
                  visible:  { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
                }}
                className="q-card"
                style={{
                  cursor: "default",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor  = "rgba(16,185,129,0.3)";
                  el.style.boxShadow    = "0 0 40px rgba(16,185,129,0.08), 0 20px 40px rgba(0,0,0,0.3)";
                  el.style.transform    = "translateY(-4px)";
                  el.style.background   = "var(--surface2)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(255,255,255,0.05)";
                  el.style.boxShadow   = "none";
                  el.style.transform   = "translateY(0)";
                  el.style.background  = "var(--surface)";
                }}
              >
                {/* Watermark number */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: -8, right: 12,
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                    fontSize: 80,
                    lineHeight: 1,
                    color: "rgba(255,255,255,0.04)",
                    userSelect: "none",
                    letterSpacing: "-0.05em",
                  }}
                >
                  {CARD_NUMS[i]}
                </div>

                {/* Icon */}
                <div
                  style={{
                    width: 48, height: 48,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                    background: isEven
                      ? "var(--emerald-dim)"
                      : "var(--violet-dim)",
                    color: isEven ? "var(--emerald)" : "var(--violet)",
                    flexShrink: 0,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {ICONS[iconKey]}
                </div>

                <h3
                  style={{
                    fontSize: "1.05rem",
                    marginBottom: 10,
                    letterSpacing: "-0.01em",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.75,
                    flex: 1,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {item.desc}
                </p>

                <div style={{ marginTop: 20, position: "relative", zIndex: 1 }}>
                  <span
                    style={{
                      fontSize: 13,
                      color: isEven ? "var(--emerald)" : "var(--violet)",
                      fontWeight: 500,
                      cursor: "pointer",
                      borderBottom: "1px solid transparent",
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
        </motion.div>
      </div>
    </section>
  );
}
