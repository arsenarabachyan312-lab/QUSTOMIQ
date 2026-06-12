"use client";
import { useState, useEffect } from "react";
import { useLang } from "@/lib/LangContext";
import QLogoNew from "@/components/QLogoNew";

export default function Nav() {
  const { t, locale, toggle: toggleLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [compact, setCompact]   = useState(false);

  const links = [
    { label: t.nav.services,  href: "#services" },
    { label: t.nav.ai,        href: "#ai" },
    { label: t.nav.process,   href: "#process" },
    { label: t.nav.about,     href: "#about" },
    { label: t.nav.contacts,  href: "#contacts" },
  ];

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 56);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`nav-glass flex items-center justify-between px-6 md:px-14 relative z-50 transition-all duration-300${compact ? " compact" : ""}`}
      style={{ paddingTop: compact ? 14 : 22, paddingBottom: compact ? 14 : 22 }}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Brand */}
      <a href="#" className="no-underline" aria-label="QUSTOMIQ">
        <QLogoNew size={compact ? 28 : 32} />
      </a>

      {/* Desktop nav links */}
      <ul className="hidden md:flex gap-8 list-none m-0 p-0">
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
      <div className="flex items-center gap-4">
        {/* Lang toggle */}
        <button
          onClick={toggleLang}
          className="font-mono text-[12px] tracking-widest min-w-[44px] min-h-[44px] flex items-center justify-center"
          style={{ color: "var(--muted)" }}
          aria-label={`Switch to ${locale === "ru" ? "English" : "Russian"}`}
        >
          <span style={{
            color:      locale === "ru" ? "var(--ink)" : "var(--muted)",
            fontWeight: locale === "ru" ? 600 : 400,
          }}>RU</span>
          <span style={{ color: "var(--border)", margin: "0 3px" }}>/</span>
          <span style={{
            color:      locale === "en" ? "var(--ink)" : "var(--muted)",
            fontWeight: locale === "en" ? 600 : 400,
          }}>EN</span>
        </button>

        {/* Desktop CTA */}
        <a
          href="#contacts"
          className="hidden md:inline-flex btn-primary"
          style={{ padding: "10px 22px", minHeight: 44, fontSize: 14 }}
        >
          {t.nav.cta}
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center"
          style={{ color: "var(--ink)" }}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6"  x2="6"  y2="18" />
              <line x1="6"  y1="6"  x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6"  x2="21" y2="6"  />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="absolute top-full left-0 right-0 md:hidden z-50 py-4 px-6 flex flex-col gap-0"
          style={{
            background: "rgba(8,9,10,0.97)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[16px] font-medium no-underline py-3 min-h-[52px] flex items-center"
              style={{
                color: "var(--muted)",
                borderBottom: "1px solid var(--border)",
              }}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacts"
            className="btn-primary mt-4"
            onClick={() => setMenuOpen(false)}
          >
            {t.nav.cta}
          </a>
        </div>
      )}
    </nav>
  );
}
