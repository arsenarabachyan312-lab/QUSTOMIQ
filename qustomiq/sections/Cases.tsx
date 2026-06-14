"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ru } from "@/lib/i18n/ru";
import { EASE_OUT } from "@/lib/animations";
import LineChart from "@/components/charts/LineChart";

/* Sparkline trend data per case — visual only, not in i18n */
const SPARKLINES = [
  [44, 50, 47, 56, 62, 69, 76, 84, 93, 102, 110, 118],  /* FMCG SFA +41% — growing */
  [100, 95, 89, 82, 75, 68, 62, 56, 50, 46, 42, 38],    /* Retail AI -28% — declining */
  [100, 91, 83, 74, 65, 57, 50, 44, 40, 37, 34, 32],    /* FMCG DMS -55% — declining */
  [38, 44, 50, 58, 65, 72, 80, 88, 96, 104, 110, 116],  /* Retail Analytics 2.1× — growing */
  [100, 93, 84, 74, 63, 52, 42, 34, 28, 23, 20, 18],    /* FMCG AI -70% — declining */
  [48, 54, 52, 60, 67, 74, 80, 87, 92, 98, 104, 110],   /* Logistics FMCG +37% — growing */
];

const SPARKLINE_COLORS = [
  "#10B981", "#10B981", "#10B981",
  "#10B981", "#10B981", "#10B981",
];

export default function Cases() {
  const reduce = useReducedMotion();
  const { eyebrow, heading, nda, cta, items } = ru.cases;

  return (
    <section
      id="cases"
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
              marginBottom: 16,
              letterSpacing: "-0.02em",
            }}
          >
            {heading}
          </h2>
          <p
            style={{
              fontFamily:    "var(--font-mono)",
              fontSize:      12,
              color:         "var(--text-hint)",
              letterSpacing: "0.06em",
              lineHeight:    1.6,
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
                initial={reduce ? false : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                transition={{ duration: 0.7, ease: EASE_OUT }}
                style={{
                  display:             "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
                  gap:                 "clamp(2rem, 5vw, 4rem)",
                  alignItems:          "center",
                }}
              >
                {/* Visual — metric block with sparkline */}
                <div
                  className="case-visual"
                  style={{
                    background:     "var(--surface)",
                    border:         "1px solid rgba(255,255,255,0.06)",
                    borderRadius:   20,
                    padding:        "clamp(2rem, 5vw, 3rem)",
                    display:        "flex",
                    flexDirection:  "column",
                    justifyContent: "space-between",
                    minHeight:      300,
                    position:       "relative",
                    overflow:       "hidden",
                    order:          isReversed ? 2 : 1,
                  }}
                >
                  {/* Background glow */}
                  <div
                    aria-hidden="true"
                    style={{
                      position:  "absolute",
                      top:       "20%",
                      left:      isReversed ? "auto" : "5%",
                      right:     isReversed ? "5%" : "auto",
                      width:     260,
                      height:    260,
                      background:"radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)",
                      filter:    "blur(40px)",
                      pointerEvents:"none",
                    }}
                  />

                  {/* Industry tag */}
                  <span
                    style={{
                      fontFamily:    "var(--font-mono)",
                      fontSize:      11,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color:         "var(--emerald)",
                      background:    "var(--emerald-dim)",
                      padding:       "4px 10px",
                      borderRadius:  6,
                      alignSelf:     isReversed ? "flex-end" : "flex-start",
                    }}
                  >
                    {item.tag}
                  </span>

                  {/* Big metric */}
                  <motion.div
                    whileHover={reduce ? {} : { scale: 1.03 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    style={{ position: "relative", zIndex: 1, alignSelf: isReversed ? "flex-end" : "flex-start" }}
                  >
                    <div
                      style={{
                        fontFamily:            "var(--font-display)",
                        fontWeight:            700,
                        fontSize:              "clamp(3.5rem, 9vw, 5.5rem)",
                        lineHeight:            1,
                        letterSpacing:         "-0.03em",
                        background:            "linear-gradient(135deg, var(--emerald) 0%, var(--violet) 100%)",
                        WebkitBackgroundClip:  "text",
                        WebkitTextFillColor:   "transparent",
                        backgroundClip:        "text",
                      }}
                    >
                      {item.metric}
                    </div>
                    <p
                      style={{
                        fontFamily:    "var(--font-mono)",
                        fontSize:      11,
                        color:         "var(--text-hint)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginTop:     8,
                        textAlign:     isReversed ? "right" : "left",
                      }}
                    >
                      {item.metricLabel}
                    </p>
                  </motion.div>

                  {/* Sparkline chart */}
                  <div
                    style={{
                      marginTop:    12,
                      borderTop:    "1px solid rgba(255,255,255,0.05)",
                      paddingTop:   12,
                      position:     "relative",
                      zIndex:       1,
                    }}
                  >
                    <span
                      style={{
                        display:       "block",
                        fontFamily:    "var(--font-mono)",
                        fontSize:      9,
                        color:         "var(--text-hint)",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        marginBottom:  6,
                      }}
                    >
                      Динамика показателя
                    </span>
                    <LineChart
                      data={SPARKLINES[i]}
                      color={SPARKLINE_COLORS[i]}
                      height={64}
                      vw={340}
                    />
                  </div>
                </div>

                {/* Text content */}
                <div className="case-text" style={{ order: isReversed ? 1 : 2 }}>
                  <h3
                    style={{
                      fontFamily:    "var(--font-display)",
                      fontSize:      "clamp(1.4rem, 3vw, 1.85rem)",
                      marginBottom:  24,
                      lineHeight:    1.15,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {item.title}
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 28 }}>
                    {(
                      [
                        { label: "Задача",  text: item.challenge },
                        { label: "Решение", text: item.solution  },
                        { label: "Итог",    text: item.result    },
                      ] as const
                    ).map(({ label, text }) => (
                      <div key={label}>
                        <span
                          style={{
                            display:       "block",
                            fontFamily:    "var(--font-mono)",
                            fontSize:      10,
                            textTransform: "uppercase",
                            letterSpacing: "0.14em",
                            color:         "var(--text-hint)",
                            marginBottom:  6,
                          }}
                        >
                          {label}
                        </span>
                        <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.7 }}>
                          {text}
                        </p>
                      </div>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    style={{
                      fontFamily:   "var(--font-body)",
                      fontWeight:   500,
                      fontSize:     14,
                      color:        "var(--emerald)",
                      textDecoration:"none",
                      borderBottom: "1px solid rgba(16,185,129,0.3)",
                      paddingBottom: 2,
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.borderColor = "var(--emerald)";
                      el.style.color       = "var(--text-primary)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.borderColor = "rgba(16,185,129,0.3)";
                      el.style.color       = "var(--emerald)";
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
