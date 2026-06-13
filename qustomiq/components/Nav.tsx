"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ru } from "@/lib/i18n/ru";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden,   setHidden]   = useState(false);
  const lastY = useRef(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 50);
    if (y > lastY.current && y > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    lastY.current = y;
  });

  return (
    <motion.header
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        paddingInline: "1.5rem",
        paddingTop: scrolled ? 10 : 20,
        transition: "padding-top 0.4s ease",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          pointerEvents: "auto",
          width: "100%",
          maxWidth: 1100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled
            ? "rgba(5, 5, 5, 0.92)"
            : "rgba(11, 15, 14, 0.80)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: scrolled
            ? "1px solid rgba(16,185,129,0.15)"
            : "1px solid rgba(255,255,255,0.06)",
          boxShadow: scrolled
            ? "0 0 32px rgba(16,185,129,0.06), 0 8px 32px rgba(0,0,0,0.4)"
            : "0 4px 24px rgba(0,0,0,0.3)",
          borderRadius: 50,
          padding: scrolled ? "11px 20px" : "14px 28px",
          transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* Logo */}
        <a
          href="/"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 16,
            color: "var(--text-primary)",
            textDecoration: "none",
            letterSpacing: "-0.02em",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          QUSTOMIQ
          <span
            style={{
              display: "inline-block",
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "var(--emerald)",
              boxShadow: "0 0 6px var(--emerald)",
              marginLeft: 2,
              marginBottom: 6,
              flexShrink: 0,
            }}
          />
        </a>

        {/* Links — hidden on mobile */}
        <nav className="hidden md:flex items-center" style={{ gap: 28 }}>
          {ru.nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "var(--text-muted)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:flex"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: 13,
            color: "#000",
            textDecoration: "none",
            background: "var(--emerald)",
            padding: "9px 20px",
            borderRadius: 50,
            letterSpacing: "-0.01em",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = "#0ea472";
            el.style.boxShadow  = "0 0 20px rgba(16,185,129,0.4)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = "var(--emerald)";
            el.style.boxShadow  = "none";
          }}
        >
          {ru.nav.cta}
        </a>
      </div>
    </motion.header>
  );
}
