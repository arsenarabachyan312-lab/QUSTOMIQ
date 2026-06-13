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
        paddingTop: scrolled ? 12 : 24,
        transition: "padding-top 0.4s ease",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(8, 11, 17, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: scrolled
            ? "1px solid rgba(16,185,129,0.18)"
            : "1px solid rgba(255,255,255,0.05)",
          borderRadius: 50,
          padding: scrolled ? "12px 20px" : "16px 28px",
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
            color: "var(--snow)",
            textDecoration: "none",
            letterSpacing: "-0.01em",
          }}
        >
          QUSTOMIQ
        </a>

        {/* Links — hidden on mobile */}
        <nav className="hidden md:flex items-center" style={{ gap: 32 }}>
          {ru.nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: "var(--mist)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--snow)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--mist)")}
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
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.85")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
        >
          {ru.nav.cta}
        </a>
      </div>
    </motion.header>
  );
}
