"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import Nav from "@/components/Nav";
import MagneticButton from "@/components/magnetic/MagneticButton";
import LineChart from "@/components/charts/LineChart";
import { ru } from "@/lib/i18n/ru";
import { EASE_OUT } from "@/lib/animations";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 60% 70% at 74% 50%, rgba(16,185,129,0.06) 0%, transparent 70%)",
      }}
    />
  ),
});

/* Stylized growth curve — 14 points ending at 100 */
const HERO_CHART = [11, 17, 14, 25, 31, 28, 43, 52, 60, 69, 78, 87, 95, 100];

function anim(delay: number) {
  return {
    initial:    { opacity: 0, y: 32 },
    animate:    { opacity: 1, y: 0 },
    transition: { duration: 0.75, ease: EASE_OUT, delay },
  } as const;
}

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      style={{
        position:      "relative",
        minHeight:     "100svh",
        display:       "flex",
        flexDirection: "column",
        background:    "var(--obsidian)",
        overflow:      "hidden",
      }}
    >
      {/* WebGL particle field — full-bleed background */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        {!reduce && <HeroScene />}
      </div>

      {/* Radial glow — anchored to right zone (~74% from left) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          background: "radial-gradient(circle at 74% 50%, rgba(16,185,129,0.13) 0%, rgba(16,185,129,0.04) 38%, transparent 65%)",
        }}
      />

      {/* Grid overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          backgroundImage: [
            "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "80px 80px",
        }}
      />

      {/* Left vignette — lifts text readability against particle field */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          background: "linear-gradient(90deg, rgba(5,5,5,0.5) 0%, rgba(5,5,5,0.12) 48%, transparent 68%)",
        }}
      />

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "38%", zIndex: 2, pointerEvents: "none",
          background: "linear-gradient(to top, var(--obsidian) 0%, transparent 100%)",
        }}
      />

      <Nav />

      {/* Content */}
      <div
        className="q-container"
        style={{
          position: "relative", zIndex: 3,
          flex: 1, display: "flex", flexDirection: "column", justifyContent: "center",
          paddingTop: "8rem", paddingBottom: "6rem",
        }}
      >
        {/* Asymmetric two-zone grid: 55 / 45 */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] items-center"
          style={{ gap: "clamp(2rem, 5vw, 4rem)" }}
        >

          {/* ── Left zone: all text ─────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>

            {/* Badge */}
            <motion.div {...(reduce ? {} : anim(0))} style={{ marginBottom: 32 }}>
              <span
                className="eyebrow"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "rgba(16,185,129,0.07)",
                  border: "1px solid rgba(16,185,129,0.18)",
                  padding: "6px 16px", borderRadius: 50,
                }}
              >
                <span
                  style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: "var(--emerald)", boxShadow: "0 0 10px var(--emerald)", flexShrink: 0,
                  }}
                />
                {ru.hero.badge}
              </span>
            </motion.div>

            {/* H1 — left-aligned */}
            <motion.h1
              {...(reduce ? {} : anim(0.12))}
              style={{
                fontSize:      "clamp(2.5rem, 5.2vw, 3.9rem)",
                maxWidth:      570,
                marginBottom:  22,
                lineHeight:    1.06,
                letterSpacing: "-0.03em",
                color:         "var(--text-primary)",
                textAlign:     "left",
              }}
            >
              {ru.hero.h1_1}
              <br />
              {(() => {
                const words = ru.hero.h1_2.split(" ");
                const plain = words.slice(0, -1).join(" ");
                const grad  = words[words.length - 1];
                return (
                  <>
                    {plain}
                    <br />
                    <span
                      style={{
                        background:           "linear-gradient(135deg, #10B981, #A78BFA)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor:  "transparent",
                        backgroundClip:       "text",
                      }}
                    >
                      {grad}
                    </span>
                  </>
                );
              })()}
            </motion.h1>

            {/* Sub */}
            <motion.p
              {...(reduce ? {} : anim(0.22))}
              style={{
                fontFamily:    "var(--font-mono)",
                fontSize:      "clamp(11px, 1.35vw, 13px)",
                color:         "var(--text-muted)",
                letterSpacing: "0.06em",
                lineHeight:    1.7,
                marginBottom:  40,
                maxWidth:      450,
                textAlign:     "left",
              }}
            >
              {ru.hero.sub}
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...(reduce ? {} : anim(0.32))}
              style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "flex-start", marginBottom: 36 }}
            >
              <MagneticButton>
                <a
                  href="#cases"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: "var(--emerald)", color: "#000",
                    fontWeight: 700, fontSize: 14,
                    padding: "14px 30px", borderRadius: 50,
                    textDecoration: "none", letterSpacing: "-0.01em",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = "#0ea472";
                    el.style.boxShadow  = "0 0 32px rgba(16,185,129,0.35)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = "var(--emerald)";
                    el.style.boxShadow  = "none";
                  }}
                >
                  {ru.hero.cta_primary}
                </a>
              </MagneticButton>

              <a
                href="#contact"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "var(--text-muted)", fontWeight: 500, fontSize: 14,
                  padding: "14px 30px", borderRadius: 50,
                  textDecoration: "none", letterSpacing: "-0.01em",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = "rgba(255,255,255,0.2)";
                  el.style.color       = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = "rgba(255,255,255,0.1)";
                  el.style.color       = "var(--text-muted)";
                }}
              >
                {ru.hero.cta_secondary}
              </a>
            </motion.div>

            {/* Stats pill — inline below CTAs */}
            <motion.div
              {...(reduce ? {} : {
                initial:    { opacity: 0, y: 12 },
                animate:    { opacity: 1, y: 0 },
                transition: { delay: 0.5, duration: 0.6, ease: EASE_OUT },
              })}
            >
              <div
                style={{
                  backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
                  background: "rgba(11,15,14,0.72)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 14, padding: "12px 18px",
                  display: "inline-block",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-mono)", fontSize: 11,
                    color: "var(--text-muted)", letterSpacing: "0.08em",
                    margin: 0, lineHeight: 1.6,
                  }}
                >
                  {ru.hero.stats}
                </p>
              </div>
            </motion.div>
          </div>

          {/* ── Right zone: growth chart + "100+" watermark ─── */}
          <motion.div
            {...(reduce ? {} : {
              initial:    { opacity: 0, x: 28 },
              animate:    { opacity: 1, x: 0 },
              transition: { duration: 0.9, ease: EASE_OUT, delay: 0.35 },
            })}
            className="relative flex flex-col justify-center min-h-[260px] max-h-[300px] lg:min-h-[380px] lg:max-h-none"
          >
            {/* Scale-contrast watermark */}
            <div
              aria-hidden="true"
              style={{
                position:      "absolute",
                top: "50%", left: "50%",
                transform:     "translate(-50%, -50%)",
                fontFamily:    "var(--font-display)",
                fontWeight:    700,
                fontSize:      "clamp(88px, 14vw, 156px)",
                color:         "rgba(16,185,129,0.07)",
                letterSpacing: "-0.06em",
                lineHeight:    1,
                userSelect:    "none",
                pointerEvents: "none",
                whiteSpace:    "nowrap",
                zIndex:        0,
              }}
            >
              100+
            </div>

            {/* Growth line chart */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <LineChart data={HERO_CHART} color="#10B981" height={260} vw={520} />
              <span
                style={{
                  position:      "absolute",
                  top: -2, right: 0,
                  fontFamily:    "var(--font-mono)",
                  fontSize:      9,
                  color:         "var(--text-hint)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                Рост · 100 проектов
              </span>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          {...(reduce ? {} : {
            initial:    { opacity: 0 },
            animate:    { opacity: 1 },
            transition: { delay: 1.1, duration: 0.8 },
          })}
          style={{
            position:  "absolute",
            bottom:    "2rem",
            left:      "50%",
            transform: "translateX(-50%)",
            display:   "flex", flexDirection: "column", alignItems: "center", gap: 10,
          }}
          aria-hidden="true"
        >
          <span
            style={{
              fontFamily:    "var(--font-mono)",
              fontSize:      10,
              color:         "var(--text-hint)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            {ru.hero.scroll_hint}
          </span>
          <div style={{ position: "relative", width: 1, height: 40, background: "rgba(255,255,255,0.08)" }}>
            <motion.div
              animate={reduce ? {} : { scaleY: [0, 1, 0], y: [0, 0, 40] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "100%",
                background: "var(--emerald)", transformOrigin: "top",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
