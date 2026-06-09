"use client";

import { useLang } from "@/lib/LangContext";
import QMark from "@/components/QMark";
import SectionBg from "@/components/SectionBg";

export default function Footer() {
  const { t } = useLang();
  const f = t.footer;

  const navLinks = [
    { label: f.nav[0], href: "#services" },
    { label: f.nav[1], href: "#ai" },
    { label: f.nav[2], href: "#process" },
    { label: f.nav[3], href: "#cases" },
    { label: f.nav[4], href: "#contacts" },
  ];

  return (
    <footer className="relative bg-[var(--bg)] border-t border-[var(--line)] px-6 md:px-14 py-14" role="contentinfo">
      <SectionBg />
      <div className="relative z-[1] max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-10 md:gap-16">
        {/* Brand */}
        <div>
          <a href="#" className="flex items-center gap-[11px] no-underline text-ink mb-4" aria-label="QUSTOMIQ">
            <QMark size={32} className="text-accent" />
            <span className="font-display font-bold text-[19px] tracking-[0.5px]">QUSTOMIQ</span>
          </a>
          <p className="text-[14px] text-muted leading-[1.6] max-w-[220px]">{f.tagline}</p>
        </div>

        {/* Navigation */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-col gap-3 list-none m-0 p-0">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-[14px] text-muted hover:text-ink transition-colors no-underline"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contacts */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[1.5px] text-muted opacity-70 mb-4">
            {f.contacts_heading}
          </p>
          <div className="flex flex-col gap-2">
            <a
              href={`mailto:${f.email}`}
              className="text-[14px] text-muted hover:text-ink transition-colors no-underline"
            >
              {f.email}
            </a>
            <a
              href={`tel:${f.phone.replace(/\s|\(|\)|-/g, "")}`}
              className="text-[14px] text-muted hover:text-ink transition-colors no-underline"
            >
              {f.phone}
            </a>
          </div>

          {/* Social stubs */}
          <div className="flex gap-3 mt-5">
            {["TG", "VK", "HH"].map((s) => (
              <a
                key={s}
                href="#"
                aria-label={s}
                className="w-9 h-9 rounded-full border border-[var(--line)] flex items-center justify-center font-mono text-[10px] text-muted hover:text-ink hover:border-ink/30 transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-[1] max-w-[1200px] mx-auto mt-10 pt-6 border-t border-[var(--line)]">
        <p className="text-[12.5px] text-muted opacity-60 font-mono">{f.rights}</p>
      </div>
    </footer>
  );
}
