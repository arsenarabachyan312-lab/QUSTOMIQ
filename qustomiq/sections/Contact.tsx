"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import MagneticButton from "@/components/magnetic/MagneticButton";
import { ru } from "@/lib/i18n/ru";
import { EASE_OUT } from "@/lib/animations";

/* Inline SVG icons — no extra package */
const IconClock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="var(--emerald)" strokeWidth="1.8" strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const IconLock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="var(--emerald)" strokeWidth="1.8" strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const IconTarget = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="var(--emerald)" strokeWidth="1.8" strokeLinecap="round"
    strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

const TRUST_ICONS = [IconClock, IconLock, IconTarget];

export default function Contact() {
  const reduce = useReducedMotion();
  const c      = ru.contact;

  const [values,  setValues]  = useState({ name: "", company: "", contact: "" });
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (field: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setValues((v) => ({ ...v, [field]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setSent(true); setLoading(false); }, 800);
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 10,
    padding: "14px 16px",
    fontSize: 15,
    color: "var(--text-primary)",
    fontFamily: "var(--font-body)",
    outline: "none",
  };

  return (
    <section
      id="contact"
      style={{
        paddingBlock: "var(--section-py)",
        background: "var(--surface)",
      }}
    >
      <div className="q-container">
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: "clamp(3rem, 7vw, 6rem)", alignItems: "start" }}
        >
          {/* Left — heading + trust */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: EASE_OUT }}
          >
            <span className="eyebrow" style={{ marginBottom: 16 }}>{c.eyebrow}</span>

            <h2
              style={{
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                marginBottom: 16,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
            >
              {c.heading}
            </h2>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: 17,
                marginBottom: 40,
                lineHeight: 1.75,
              }}
            >
              {c.sub}
            </p>

            {/* Trust signals */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {c.trust.map((t, i) => {
                const Icon = TRUST_ICONS[i];
                return (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Icon />
                    <span
                      style={{
                        fontSize: 15,
                        color: "var(--text-muted)",
                        lineHeight: 1.4,
                      }}
                    >
                      {t}
                    </span>
                  </div>
                );
              })}
            </div>

            <div
              style={{
                marginTop: 40,
                paddingTop: 32,
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p
                style={{
                  fontSize: 12,
                  color: "var(--text-hint)",
                  marginBottom: 8,
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.08em",
                }}
              >
                или напишите напрямую
              </p>
              <a
                href={`mailto:${c.email}`}
                style={{
                  fontSize: 15,
                  color: "var(--emerald)",
                  textDecoration: "none",
                  fontWeight: 500,
                  fontFamily: "var(--font-mono)",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.7")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
              >
                {c.email}
              </a>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.12 }}
          >
            <div
              style={{
                background: "var(--obsidian)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 20,
                padding: "clamp(1.5rem, 4vw, 2.5rem)",
              }}
            >
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                  style={{
                    textAlign: "center",
                    padding: "3.5rem 1rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      width: 56, height: 56, borderRadius: "50%",
                      background: "rgba(16,185,129,0.1)",
                      border: "1px solid rgba(16,185,129,0.25)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12l5 5 9-9" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p
                    style={{
                      color: "var(--text-primary)",
                      fontSize: 16,
                      lineHeight: 1.6,
                      fontWeight: 500,
                    }}
                  >
                    {c.success}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    { field: "name"    as const, placeholder: c.name    },
                    { field: "company" as const, placeholder: c.company },
                    { field: "contact" as const, placeholder: c.contact },
                  ].map(({ field, placeholder }) => (
                    <input
                      key={field}
                      type="text"
                      placeholder={placeholder}
                      value={values[field]}
                      onChange={onChange(field)}
                      required
                      style={inputBase}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "var(--emerald)";
                        e.currentTarget.style.boxShadow  = "0 0 0 3px rgba(16,185,129,0.1)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                        e.currentTarget.style.boxShadow  = "none";
                      }}
                    />
                  ))}

                  <div style={{ marginTop: 6 }}>
                  <MagneticButton strength={0.15} className="w-full">
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        width: "100%",
                        height: 56,
                        background: loading ? "rgba(16,185,129,0.6)" : "var(--emerald)",
                        color: "#000",
                        fontWeight: 700,
                        fontSize: 15,
                        fontFamily: "var(--font-body)",
                        borderRadius: 12,
                        border: "none",
                        cursor: loading ? "wait" : "pointer",
                        letterSpacing: "-0.01em",
                      }}
                      onMouseEnter={(e) => {
                        if (!loading) {
                          const el = e.currentTarget as HTMLButtonElement;
                          el.style.background = "#0ea472";
                          el.style.boxShadow  = "0 0 32px rgba(16,185,129,0.3)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLButtonElement;
                        el.style.background = loading ? "rgba(16,185,129,0.6)" : "var(--emerald)";
                        el.style.boxShadow  = "none";
                      }}
                    >
                      {loading ? "Отправка..." : c.submit}
                    </button>
                  </MagneticButton>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
