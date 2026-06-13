"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ru } from "@/lib/i18n/ru";
import { EASE_OUT } from "@/lib/animations";

export default function Cases() {
  const reduce = useReducedMotion();
  const { eyebrow, heading, nda, cta, items } = ru.cases;

  return (
    <section
      id="cases"
      style={{
        paddingBlock: "var(--section-py)",
        background: "var(--surface)",
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
              background: "var(--g-vi)",
              borderRadius: 1,
              flexShrink: 0,
            }} />
            <span className="eyebrow">{eyebrow}</span>
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: 16 }}>{heading}</h2>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--mist)",
              letterSpacing: "0.06em",
            }}
          >
            {nda}
          </p>
        </motion.div>

        {/* Case cards — alternating layout */}
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(3rem, 6vw, 5rem)" }}>
          {items.map((item, i) => {
            const isReversed = i % 2 !== 0;

            return (
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, clipPath: "inset(15% 0% 0% 0%)" }}
                whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
                viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                transition={{ duration: 0.75, ease: EASE_OUT }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
                  gap: "clamp(2rem, 5vw, 4rem)",
                  alignItems: "center",
                }}
              >
                {/* Visual — metric block */}
                <div
                  style={{
                    background: "var(--surface2)",
                    border: "1px solid var(--border)",
                    borderRadius: 20,
                    padding: "clamp(2rem, 5vw, 3.5rem)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: isReversed ? "flex-end" : "flex-start",
                    justifyContent: "space-between",
                    minHeight: 260,
                    position: "relative",
                    overflow: "hidden",
                    order: isReversed ? 2 : 1,
                  }}
                >
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: "40%", left: isReversed ? "auto" : "20%", right: isReversed ? "20%" : "auto",
                      width: 200, height: 200,
                      background: "radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)",
                      filter: "blur(40px)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Industry tag */}
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: "var(--emerald)",
                      background: "rgba(16,185,129,0.1)",
                      border: "1px solid rgba(16,185,129,0.2)",
                      padding: "5px 12px",
                      borderRadius: 50,
                    }}
                  >
                    {item.tag}
                  </span>

                  {/* Big metric */}
                  <motion.div
                    whileHover={reduce ? {} : { scale: 1.04 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{ position: "relative", zIndex: 1 }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "clamp(3rem, 8vw, 5.5rem)",
                        lineHeight: 1,
                        background: "var(--g-vi)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {item.metric}
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 12,
                        color: "var(--mist)",
                        letterSpacing: "0.08em",
                        marginTop: 6,
                      }}
                    >
                      {item.metricLabel}
                    </p>
                  </motion.div>
                </div>

                {/* Text content */}
                <div style={{ order: isReversed ? 1 : 2 }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
                      marginBottom: 24,
                      lineHeight: 1.2,
                    }}
                  >
                    {item.title}
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 28 }}>
                    {(
                      [
                        { label: "Задача",  text: item.challenge },
                        { label: "Решение", text: item.solution  },
                        { label: "Итог",    text: item.result    },
                      ] as const
                    ).map(({ label, text }) => (
                      <div key={label}>
                        <span
                          className="eyebrow"
                          style={{ fontSize: 10, marginBottom: 4, display: "block" }}
                        >
                          {label}
                        </span>
                        <p style={{ color: "var(--mist)", fontSize: 15, lineHeight: 1.65 }}>
                          {text}
                        </p>
                      </div>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 500,
                      fontSize: 14,
                      color: "var(--violet)",
                      textDecoration: "none",
                      borderBottom: "1px solid rgba(167,139,250,0.4)",
                      paddingBottom: 2,
                      transition: "border-color 0.2s, color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.borderColor = "var(--violet)";
                      el.style.color = "var(--snow)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.borderColor = "rgba(167,139,250,0.4)";
                      el.style.color = "var(--violet)";
                    }}
                  >
                    {cta}
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
