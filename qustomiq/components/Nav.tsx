"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ru } from "@/lib/i18n/ru";

const EASE = [0.22, 1, 0.36, 1] as const;

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      {open ? (
        <>
          <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="16" y1="4" x2="4"  y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </>
      ) : (
        <>
          <line x1="3" y1="6"  x2="17" y2="6"  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="3" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </>
      )}
    </svg>
  );
}

export default function Nav() {
  const [scrolled,  setScrolled]  = useState(false);
  const [hidden,    setHidden]    = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const lastY = useRef(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 50);
    if (y > lastY.current && y > 100) {
      setHidden(true);
      setMenuOpen(false);
    } else {
      setHidden(false);
    }
    lastY.current = y;
  });

  const close = () => setMenuOpen(false);

  return (
    /* header is the fixed positioning context for the mobile menu */
    <motion.header
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      style={{
        position:      "fixed",
        top: 0, left: 0, right: 0,
        zIndex:        1000,
        display:       "flex",
        justifyContent:"center",
        paddingInline: "1.5rem",
        paddingTop:    scrolled ? 10 : 20,
        transition:    "padding-top 0.4s ease",
        pointerEvents: "none",
      }}
    >
      {/* Nav pill */}
      <div
        style={{
          pointerEvents: "auto",
          width: "100%", maxWidth: 1100,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: scrolled ? "rgba(5,5,5,0.92)" : "rgba(11,15,14,0.80)",
          backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
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
            fontFamily:    "var(--font-display)",
            fontWeight:    700,
            fontSize:      22,
            color:         "var(--text-primary)",
            textDecoration:"none",
            letterSpacing: "-0.02em",
          }}
        >
          <span>QUSTOM</span><span style={{ color: "#10B981" }}>IQ</span>
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center" style={{ gap: 22 }}>
          {ru.nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontSize:      13,
                fontWeight:    500,
                color:         "var(--text-muted)",
                textDecoration:"none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden md:flex"
          style={{
            fontFamily:    "var(--font-body)",
            fontWeight:    600,
            fontSize:      13,
            color:         "#000",
            textDecoration:"none",
            background:    "var(--emerald)",
            padding:       "9px 20px",
            borderRadius:  50,
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

        {/* Mobile hamburger */}
        <button
          className="flex md:hidden items-center justify-center"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          style={{
            background: "none", border: "none",
            color:      "var(--text-primary)",
            padding:    8, cursor: "pointer", borderRadius: 8,
          }}
        >
          <BurgerIcon open={menuOpen} />
        </button>
      </div>

      {/* Mobile menu — positioned absolutely relative to this fixed header,
          so it always tracks directly below the pill regardless of scroll state */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: EASE }}
            style={{
              position:      "absolute",
              top:           "calc(100% + 8px)",
              left:          "1rem",
              right:         "1rem",
              pointerEvents: "auto",
              background:    "rgba(5,5,5,0.96)",
              backdropFilter:"blur(28px)", WebkitBackdropFilter: "blur(28px)",
              border:        "1px solid rgba(255,255,255,0.08)",
              borderRadius:  20,
              padding:       "1rem",
              display:       "flex",
              flexDirection: "column",
              gap:           2,
            }}
          >
            {ru.nav.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={close}
                style={{
                  display:       "block",
                  padding:       "14px 16px",
                  fontSize:      16,
                  fontWeight:    500,
                  color:         "var(--text-muted)",
                  textDecoration:"none",
                  borderRadius:  12,
                  transition:    "color 0.15s, background 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color      = "var(--text-primary)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color      = "var(--text-muted)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                }}
              >
                {l.label}
              </a>
            ))}

            <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBlock: 8 }} />

            <a
              href="#contact"
              onClick={close}
              style={{
                display:       "block",
                padding:       "14px 16px",
                textAlign:     "center",
                background:    "var(--emerald)",
                color:         "#000",
                fontWeight:    700,
                fontSize:      15,
                textDecoration:"none",
                borderRadius:  12,
                letterSpacing: "-0.01em",
              }}
            >
              {ru.nav.cta}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
