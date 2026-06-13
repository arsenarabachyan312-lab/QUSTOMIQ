"use client";
import { useLang } from "@/lib/LangContext";
import QLogoNew from "@/components/QLogoNew";

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
    <footer
      className="relative"
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        paddingLeft:  "clamp(1rem, 5vw, 3.5rem)",
        paddingRight: "clamp(1rem, 5vw, 3.5rem)",
        paddingTop: "clamp(2.5rem, 6vw, 3.5rem)",
        paddingBottom: "clamp(2rem, 5vw, 3.5rem)",
      }}
      role="contentinfo"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Main grid — 1 col on mobile, 3 cols on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-10 md:gap-16 text-center md:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <a href="#" className="no-underline" aria-label="QUSTOMIQ">
              <QLogoNew size={28} />
            </a>
            <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6, maxWidth: 220 }}>
              {f.tagline}
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-row md:flex-col flex-wrap justify-center md:justify-start gap-3 md:gap-3 list-none m-0 p-0">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="no-underline transition-colors duration-200"
                    style={{ fontSize: 14, color: "var(--muted)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacts */}
          <div className="flex flex-col items-center md:items-start">
            <p style={{
              fontFamily: "var(--font-mono)", fontSize: 11,
              textTransform: "uppercase", letterSpacing: "0.14em",
              color: "var(--muted)", opacity: 0.7, marginBottom: 14,
            }}>
              {f.contacts_heading}
            </p>
            <div className="flex flex-col gap-2 items-center md:items-start">
              <a
                href={`mailto:${f.email}`}
                className="no-underline transition-colors duration-200"
                style={{ fontSize: 14, color: "var(--muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
              >
                {f.email}
              </a>
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-5">
              {["TG", "VK", "HH"].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="no-underline transition-all duration-200 flex items-center justify-center"
                  style={{
                    width: 40, height: 40, borderRadius: "50%",
                    border: "1px solid var(--border)",
                    fontFamily: "var(--font-mono)", fontSize: 10,
                    color: "var(--muted)",
                    minWidth: 40, minHeight: 40,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--primary)";
                    e.currentTarget.style.color = "var(--primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.color = "var(--muted)";
                  }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 pt-6 text-center md:text-left"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p style={{ fontSize: 12, color: "var(--muted)", opacity: 0.55, fontFamily: "var(--font-mono)" }}>
            {f.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
