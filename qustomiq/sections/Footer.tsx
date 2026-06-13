"use client";

import { ru } from "@/lib/i18n/ru";

export default function Footer() {
  const f = ru.footer;

  return (
    <footer
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        paddingBlock: "clamp(3rem, 6vw, 4.5rem)",
      }}
      role="contentinfo"
    >
      <div className="q-container">
        <div
          className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto]"
          style={{ gap: "clamp(2rem, 5vw, 4rem)" }}
        >
          {/* Brand */}
          <div>
            <a
              href="/"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 18,
                color: "var(--snow)",
                textDecoration: "none",
                letterSpacing: "-0.01em",
                display: "inline-block",
                marginBottom: 12,
              }}
            >
              QUSTOMIQ
            </a>
            <p
              style={{
                fontSize: 14,
                color: "var(--mist)",
                lineHeight: 1.6,
                maxWidth: 220,
              }}
            >
              {f.tagline}
            </p>
          </div>

          {/* Nav columns */}
          {f.cols.map((col) => (
            <div key={col.heading}>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--mist)",
                  opacity: 0.6,
                  marginBottom: 16,
                }}
              >
                {col.heading}
              </p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map((link, i) => (
                  <li key={link}>
                    <a
                      href={col.hrefs[i]}
                      style={{
                        fontSize: 14,
                        color: "var(--mist)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--snow)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--mist)")}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: "clamp(2.5rem, 5vw, 3.5rem)",
            paddingTop: 24,
            borderTop: "1px solid var(--border)",
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: 12, color: "var(--mist)", opacity: 0.5, fontFamily: "var(--font-mono)" }}>
            {f.rights}
          </p>
          <a
            href="#"
            style={{
              fontSize: 12,
              color: "var(--mist)",
              opacity: 0.5,
              textDecoration: "none",
              fontFamily: "var(--font-mono)",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.9")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.5")}
          >
            {f.privacy}
          </a>
        </div>
      </div>
    </footer>
  );
}
