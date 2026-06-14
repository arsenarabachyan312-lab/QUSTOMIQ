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
        background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(16,185,129,0.06) 0%, transparent 70%)",
      }}
    />
  ),
});

function item(delay: number) {
  return {
    initial:    { opacity: 0, y: 40 },
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

      {/* Radial glow — centered behind headline */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background: "radial-gradient(circle at 50% 45%, rgba(16,185,129,0.08) 0%, rgba(16,185,129,0.02) 35%, transparent 70%)",
        }}
      />

      {/* Subtle grid overlay — creates depth */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          backgroundImage: [
            "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "80px 80px",
        }}
      />

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "40%",
          background: "linear-gradient(to top, var(--obsidian) 0%, transparent 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <Nav />

      {/* Content */}
      <div
        className="q-container"
        style={{
          position: "relative",
          zIndex: 3,
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
              background: "rgba(16,185,129,0.07)",
              border: "1px solid rgba(16,185,129,0.18)",
              padding: "6px 16px",
              borderRadius: 50,
              marginBottom: 36,
            }}
          >
            <span
              style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "var(--emerald)",
                boxShadow: "0 0 10px var(--emerald)",
                flexShrink: 0,
              }}
            />
            {ru.hero.badge}
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          {...(reduce ? {} : item(0.15))}
          style={{
            fontSize: "clamp(2.8rem, 7.5vw, 4.75rem)",
            maxWidth: 860,
            marginBottom: 24,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
          }}
        >
          {ru.hero.h1_1}
          <br />
          {/* "инфраструктуру" — solid; "бизнеса" — gradient */}
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
          {...(reduce ? {} : item(0.25))}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(12px, 1.8vw, 14px)",
            color: "var(--text-muted)",
            letterSpacing: "0.06em",
            marginBottom: 48,
            maxWidth: 560,
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
                fontWeight: 700,
                fontSize: 14,
                padding: "14px 30px",
                borderRadius: 50,
                textDecoration: "none",
                letterSpacing: "-0.01em",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background  = "#0ea472";
                el.style.boxShadow   = "0 0 32px rgba(16,185,129,0.35)";
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
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              border: "1px solid rgba(255,255,255,0.1)",
              color: "var(--text-muted)",
              fontWeight: 500,
              fontSize: 14,
              padding: "14px 30px",
              borderRadius: 50,
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "rgba(255,255,255,0.2)";
              el.style.color = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "rgba(255,255,255,0.1)";
              el.style.color = "var(--text-muted)";
            }}
          >
            {ru.hero.cta_secondary}
          </a>
        </motion.div>

        {/* Stats card — bottom-left, aligned with headline left edge */}
        <motion.div
          {...(reduce ? {} : {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { delay: 0.7, duration: 0.6, ease: EASE_OUT },
          })}
          style={{
            position: "absolute",
            bottom: "5rem",
            left: 0,
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            background: "rgba(11,15,14,0.7)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 14,
            padding: "14px 20px",
          }}
          aria-hidden="true"
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--text-muted)",
              letterSpacing: "0.08em",
              whiteSpace: "nowrap",
            }}
          >
            {ru.hero.stats}
          </p>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          {...(reduce ? {} : {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 1.0, duration: 0.8 },
          })}
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
          aria-hidden="true"
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--text-hint)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            {ru.hero.scroll_hint}
          </span>
          {/* Animated emerald line growing downward */}
          <div style={{ position: "relative", width: 1, height: 40, background: "rgba(255,255,255,0.08)" }}>
            <motion.div
              animate={reduce ? {} : { scaleY: [0, 1, 0], y: [0, 0, 40] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: 0, left: 0, right: 0,
                height: "100%",
                background: "var(--emerald)",
                transformOrigin: "top",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
