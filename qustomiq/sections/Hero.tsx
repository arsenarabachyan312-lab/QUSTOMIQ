"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import Nav from "@/components/Nav";
import MagneticButton from "@/components/magnetic/MagneticButton";
import { ru } from "@/lib/i18n/ru";
import { EASE_OUT } from "@/lib/animations";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(16,185,129,0.07) 0%, transparent 70%)",
      }}
    />
  ),
});

function item(delay: number) {
  return {
    initial:    { opacity: 0, y: 40 },
    animate:    { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: EASE_OUT, delay },
  } as const;
}

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        background: "var(--obsidian)",
        overflow: "hidden",
      }}
    >
      {/* WebGL particle background */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        {!reduce && <HeroScene />}
      </div>

      {/* Bottom fade — blend particles into page */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "35%",
          background: "linear-gradient(to top, var(--obsidian), transparent)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <Nav />

      {/* Content */}
      <div
        className="q-container"
        style={{
          position: "relative",
          zIndex: 2,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          paddingTop: "10rem",
          paddingBottom: "8rem",
        }}
      >
        {/* Badge */}
        <motion.div {...(reduce ? {} : item(0))}>
          <span
            className="eyebrow"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(16,185,129,0.08)",
              border: "1px solid rgba(16,185,129,0.2)",
              padding: "6px 16px",
              borderRadius: 50,
              marginBottom: 32,
            }}
          >
            <span
              style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "var(--emerald)",
                boxShadow: "0 0 8px #10B981",
              }}
            />
            {ru.hero.badge}
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          {...(reduce ? {} : item(0.15))}
          style={{
            fontSize: "clamp(2.6rem, 7.5vw, 4.75rem)",
            maxWidth: 820,
            marginBottom: 24,
            lineHeight: 1.05,
          }}
        >
          {ru.hero.h1_1}
          <br />
          <span className="grad-vi">{ru.hero.h1_2}</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          {...(reduce ? {} : item(0.25))}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(13px, 2vw, 15px)",
            color: "var(--mist)",
            letterSpacing: "0.07em",
            marginBottom: 48,
          }}
        >
          {ru.hero.sub}
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...(reduce ? {} : item(0.35))}
          style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}
        >
          <MagneticButton>
            <a
              href="#cases"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "var(--emerald)",
                color: "#000",
                fontWeight: 600,
                fontSize: 15,
                padding: "14px 30px",
                borderRadius: 50,
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.85")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
            >
              {ru.hero.cta_primary}
            </a>
          </MagneticButton>

          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              border: "1px solid rgba(255,255,255,0.1)",
              color: "var(--mist)",
              fontWeight: 500,
              fontSize: 15,
              padding: "14px 30px",
              borderRadius: 50,
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "rgba(255,255,255,0.22)";
              el.style.color = "var(--snow)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "rgba(255,255,255,0.1)";
              el.style.color = "var(--mist)";
            }}
          >
            {ru.hero.cta_secondary}
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          {...(reduce ? {} : {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.9, duration: 0.8 },
          })}
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
          aria-hidden="true"
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--mist)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            {ru.hero.scroll_hint}
          </span>
          <motion.div
            animate={reduce ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
              <path d="M1 1l7 7 7-7" stroke="var(--mist)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
