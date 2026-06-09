"use client";

import { useState } from "react";
import { useLang } from "@/lib/LangContext";
import { useTheme } from "@/lib/ThemeContext";
import QMark from "@/components/QMark";

export default function Nav() {
  const { t, locale, toggle: toggleLang } = useLang();
  const { theme, toggle: toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: t.nav.services, href: "#services" },
    { label: t.nav.ai, href: "#ai" },
    { label: t.nav.process, href: "#process" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.contacts, href: "#contacts" },
  ];

  return (
    <nav
      className="flex items-center justify-between px-6 md:px-14 py-7 relative z-50"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Brand */}
      <a href="#" className="flex items-center gap-[11px] no-underline text-ink" aria-label="QUSTOMIQ">
        <QMark size={32} />
        <span className="font-display font-bold text-[19px] tracking-[0.5px]">QUSTOMIQ</span>
      </a>

      {/* Desktop links */}
      <ul className="hidden md:flex gap-7 list-none m-0 p-0">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-[14.5px] font-medium text-muted hover:text-ink transition-colors no-underline font-body"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Right controls */}
      <div className="flex items-center gap-[18px]">
        {/* Lang toggle */}
        <button
          onClick={toggleLang}
          className="font-mono text-[12.5px] tracking-[1px] text-muted hover:text-ink transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label={`Switch to ${locale === "ru" ? "English" : "Russian"}`}
        >
          <span className={locale === "ru" ? "text-ink font-semibold" : "text-muted"}>RU</span>
          <span className="text-muted mx-1">/</span>
          <span className={locale === "en" ? "text-ink font-semibold" : "text-muted"}>EN</span>
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="min-w-[44px] min-h-[44px] flex items-center justify-center text-muted hover:text-ink transition-colors"
          aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
        >
          {theme === "light" ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
        </button>

        {/* CTA button */}
        <a
          href="#contacts"
          className="hidden md:flex items-center bg-accent text-[#0D1B2A] px-[22px] py-3 rounded-pill text-[14.5px] font-semibold hover:opacity-80 transition-opacity no-underline whitespace-nowrap min-h-[44px]"
        >
          {t.nav.cta}
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-ink"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[var(--bg)] border-b border-[var(--line)] shadow-card-lg md:hidden z-50 py-4 px-6 flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[16px] font-medium text-muted hover:text-ink transition-colors no-underline py-2 min-h-[44px] flex items-center"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacts"
            className="mt-3 inline-flex items-center justify-center bg-accent text-[#0D1B2A] px-[22px] py-3 rounded-pill text-[14.5px] font-semibold min-h-[44px]"
            onClick={() => setMenuOpen(false)}
          >
            {t.nav.cta}
          </a>
        </div>
      )}
    </nav>
  );
}
