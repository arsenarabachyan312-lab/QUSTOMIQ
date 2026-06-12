"use client";
import { useState, useEffect } from "react";
import { useLang } from "@/lib/LangContext";
import QLogoNew from "@/components/QLogoNew";

export default function Nav() {
  const { t, locale, toggle: toggleLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [compact,  setCompact]  = useState(false);

  const links = [
    { label: t.nav.services, href: "#services" },
    { label: t.nav.ai,       href: "#ai"       },
    { label: t.nav.process,  href: "#process"  },
    { label: t.nav.about,    href: "#about"    },
    { label: t.nav.contacts, href: "#contacts" },
  ];

  /* Compact on scroll */
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 56);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <nav
        className={`nav-glass flex items-center justify-between relative z-50 transition-all duration-300${compact ? " compact" : ""}`}
        style={{
          paddingLeft:  "clamp(1rem, 5vw, 3.5rem)",
          paddingRight: "clamp(1rem, 5vw, 3.5rem)",
          paddingTop:    compact ? 12 : 20,
          paddingBottom: compact ? 12 : 20,
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Brand */}
        <a href="#" className="no-underline" aria-label="QUSTOMIQ" onClick={close}>
          <QLogoNew size={compact ? 26 : 30} />
        </a>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex gap-8 list-none m-0 p-0">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[14px] font-medium no-underline transition-colors duration-200"
                style={{ color: "var(--muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Lang toggle */}
          <button
            onClick={toggleLang}
            className="font-mono text-[12px] tracking-widest min-w-[44px] min-h-[44px] flex items-center justify-center"
            style={{ color: "var(--muted)" }}
            aria-label={`Switch to ${locale === "ru" ? "English" : "Russian"}`}
          >
            <span style={{ color: locale === "ru" ? "var(--ink)" : "var(--muted)", fontWeight: locale === "ru" ? 600 : 400 }}>RU</span>
            <span style={{ color: "var(--border)", margin: "0 3px" }}>/</span>
            <span style={{ color: locale === "en" ? "var(--ink)" : "var(--muted)", fontWeight: locale === "en" ? 600 : 400 }}>EN</span>
          </button>

          {/* Desktop CTA */}
          <a
            href="#contacts"
            className="hidden lg:inline-flex btn-primary"
            style={{ padding: "10px 22px", minHeight: 44, fontSize: 14 }}
          >
            {t.nav.cta}
          </a>

          {/* Hamburger — visible below lg */}
          <button
            className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg transition-colors duration-200"
            style={{
              color: "var(--ink)",
              background: menuOpen ? "rgba(16,185,129,0.10)" : "transparent",
            }}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="18" y1="6"  x2="6"  y2="18" />
                <line x1="6"  y1="6"  x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="3" y1="6"  x2="21" y2="6"  />
                <line x1="3" y1="12" x2="18" y2="12" />
                <line x1="3" y1="18" x2="15" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* ── Fullscreen mobile menu overlay ── */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className="lg:hidden"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          background: "rgba(8,9,10,0.97)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
          opacity:    menuOpen ? 1 : 0,
          transform:  menuOpen ? "translateY(0)" : "translateY(-12px)",
          transition: "opacity 0.25s ease, transform 0.25s ease",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        {/* Close button */}
        <button
          onClick={close}
          className="absolute top-5 right-5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl"
          style={{ color: "var(--muted)", background: "rgba(255,255,255,0.05)" }}
          aria-label="Закрыть меню"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <line x1="18" y1="6"  x2="6"  y2="18" />
            <line x1="6"  y1="6"  x2="18" y2="18" />
          </svg>
        </button>

        {/* Logo top */}
        <a href="#" onClick={close} className="no-underline absolute top-5 left-5">
          <QLogoNew size={26} />
        </a>

        {/* Links */}
        <nav className="flex flex-col items-center gap-2 w-full px-8">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={close}
              className="no-underline w-full max-w-[320px] flex items-center justify-center min-h-[60px] rounded-2xl transition-all duration-200"
              style={{
                fontSize: "clamp(1.1rem, 4vw, 1.4rem)",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                color: "var(--muted)",
                border: "1px solid transparent",
                transitionDelay: menuOpen ? `${i * 40}ms` : "0ms",
                transform: menuOpen ? "translateY(0)" : "translateY(8px)",
                opacity: menuOpen ? 1 : 0,
                transition: `all 0.3s ease ${i * 40}ms`,
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.color = "var(--ink)";
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.color = "var(--muted)";
                e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.background = "transparent";
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="mt-6 w-full px-8 max-w-[320px]">
          <a
            href="#contacts"
            className="btn-primary w-full"
            onClick={close}
            style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(8px)",
              transition: `all 0.3s ease ${links.length * 40}ms`,
            }}
          >
            {t.nav.cta}
          </a>
        </div>

        {/* Bottom: lang toggle */}
        <button
          onClick={toggleLang}
          className="mt-8 font-mono text-[13px] tracking-widest min-h-[44px] px-4"
          style={{ color: "var(--muted)" }}
        >
          <span style={{ color: locale === "ru" ? "var(--ink)" : "var(--muted)", fontWeight: locale === "ru" ? 600 : 400 }}>RU</span>
          <span style={{ color: "var(--border)", margin: "0 4px" }}>/</span>
          <span style={{ color: locale === "en" ? "var(--ink)" : "var(--muted)", fontWeight: locale === "en" ? 600 : 400 }}>EN</span>
        </button>
      </div>
    </>
  );
}
