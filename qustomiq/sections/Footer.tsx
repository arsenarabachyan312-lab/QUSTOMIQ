"use client";

import { ru } from "@/lib/i18n/ru";

export default function Footer() {
  const f = ru.footer;

  return (
    <footer
      style={{
        background: "var(--surface)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
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
                color: "var(--text-primary)",
                textDecoration: "none",
                letterSpacing: "-0.02em",
                display: "inline-flex",
                alignItems: "center",
                gap: 2,
                marginBottom: 10,
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
            <p
              style={{
                fontSize: 12,
                fontFamily: "var(--font-mono)",
                color: "var(--text-hint)",
                lineHeight: 1.6,
                maxWidth: 240,
                letterSpacing: "0.04em",
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
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "var(--text-hint)",
                  marginBottom: 18,
                }}
              >
                {col.heading}
              </p>
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {col.links.map((link, i) => (
                  <li key={link}>
                    <a
                      href={col.hrefs[i]}
                      style={{
                        fontSize: 14,
                        color: "var(--text-muted)",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
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
            borderTop: "1px solid rgba(255,255,255,0.04)",
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: 12,
              color: "var(--text-hint)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.04em",
            }}
          >
            {f.rights}
          </p>
          <a
            href={`mailto:${f.email}`}
            style={{
              fontSize: 12,
              color: "var(--text-hint)",
              textDecoration: "none",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.04em",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--emerald)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-hint)")}
          >
            {f.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
