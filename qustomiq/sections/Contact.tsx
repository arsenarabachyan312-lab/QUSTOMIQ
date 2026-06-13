"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import MagneticButton from "@/components/magnetic/MagneticButton";
import { ru } from "@/lib/i18n/ru";
import { EASE_OUT } from "@/lib/animations";

const CHECK = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="6.5" stroke="rgba(16,185,129,0.4)" />
    <path d="M4 7l2 2 4-4" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Contact() {
  const reduce = useReducedMotion();
  const c = ru.contact;

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

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--surface2)",
    border: "1px solid var(--border)",
    borderRadius: 12,
    padding: "14px 18px",
    fontSize: 15,
    color: "var(--snow)",
    fontFamily: "var(--font-body)",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <section
      id="contact"
      style={{
        paddingBlock: "var(--section-py)",
        background: "var(--obsidian)",
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
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 24, height: 2,
                background: "var(--g-em)",
                borderRadius: 1,
              }} />
              <span className="eyebrow">{c.eyebrow}</span>
            </div>

            <h2
              style={{
                fontSize: "clamp(2rem, 5vw, 3.2rem)",
                marginBottom: 16,
                lineHeight: 1.1,
              }}
            >
              {c.heading}
            </h2>
            <p style={{ color: "var(--mist)", fontSize: 17, marginBottom: 40, lineHeight: 1.6 }}>
              {c.sub}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {c.trust.map((t) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {CHECK}
                  <span style={{ fontSize: 15, color: "var(--mist)" }}>{t}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid var(--border)" }}>
              <p style={{ fontSize: 13, color: "var(--mist)", marginBottom: 6, fontFamily: "var(--font-mono)" }}>
                или напишите напрямую
              </p>
              <a
                href={`mailto:${c.email}`}
                style={{
                  fontSize: 16,
                  color: "var(--emerald)",
                  textDecoration: "none",
                  fontWeight: 500,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.75")}
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
                background: "var(--surface)",
                border: "1px solid var(--border)",
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
                    padding: "3rem 1rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      width: 52, height: 52, borderRadius: "50%",
                      background: "rgba(16,185,129,0.1)",
                      border: "1px solid rgba(16,185,129,0.3)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <path d="M4 11l5 5 9-9" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p style={{ color: "var(--snow)", fontSize: 16, lineHeight: 1.6 }}>{c.success}</p>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
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
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(16,185,129,0.45)")}
                      onBlur={(e)  => (e.currentTarget.style.borderColor = "var(--border)")}
                    />
                  ))}

                  <MagneticButton strength={0.2} className="w-full mt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        width: "100%",
                        background: loading ? "rgba(16,185,129,0.6)" : "var(--emerald)",
                        color: "#000",
                        fontWeight: 700,
                        fontSize: 15,
                        fontFamily: "var(--font-body)",
                        padding: "15px 24px",
                        borderRadius: 50,
                        border: "none",
                        cursor: loading ? "wait" : "pointer",
                        transition: "opacity 0.2s, background 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        if (!loading) (e.currentTarget as HTMLButtonElement).style.opacity = "0.85";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                      }}
                    >
                      {loading ? "Отправка..." : c.submit}
                    </button>
                  </MagneticButton>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
