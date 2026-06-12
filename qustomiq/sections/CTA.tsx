"use client";
import { useState } from "react";
import { useLang } from "@/lib/LangContext";
import SectionBg from "@/components/SectionBg";

const fieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 18px",
  borderRadius: 12,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid var(--border)",
  color: "var(--ink)",
  fontSize: 15,
  fontFamily: "var(--font-body)",
  outline: "none",
  transition: "border-color 0.2s ease",
};

const fieldFocusStyle: React.CSSProperties = {
  borderColor: "var(--primary)",
};

function Field({ type = "text", placeholder, required = false }: {
  type?: string; placeholder: string; required?: boolean;
}) {
  const [focus, setFocus] = useState(false);
  return (
    <input
      type={type}
      placeholder={placeholder}
      required={required}
      style={{ ...fieldStyle, ...(focus ? fieldFocusStyle : {}) }}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    />
  );
}

function TextArea({ placeholder, rows = 3 }: { placeholder: string; rows?: number }) {
  const [focus, setFocus] = useState(false);
  return (
    <textarea
      placeholder={placeholder}
      rows={rows}
      style={{ ...fieldStyle, ...(focus ? fieldFocusStyle : {}), resize: "none" }}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    />
  );
}

export default function CTA() {
  const { t } = useLang();
  const c = t.cta;
  const [sent, setSent] = useState(false);
  const [messenger, setMessenger] = useState("");

  return (
    <section
      id="contacts"
      className="py-20 md:py-28 px-6 md:px-14 relative"
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
      }}
      aria-labelledby="cta-heading"
    >
      <SectionBg />
      <div className="relative z-[1] max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <div className="reveal">
          <span className="section-label">Контакты</span>
          <h2 id="cta-heading" className="mb-5">{c.heading}</h2>
          <p className="mb-8" style={{ maxWidth: 440 }}>{c.sub}</p>

          <div className="flex items-center gap-3 flex-wrap" style={{ fontSize: 14, color: "var(--muted)" }}>
            <span>{c.or}</span>
            <a
              href={`mailto:${c.email}`}
              className="no-underline transition-colors duration-200"
              style={{ color: "var(--primary)" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              {c.email}
            </a>
          </div>

          {/* Feature list */}
          <div className="mt-10 flex flex-col gap-4">
            {[
              "Ответ в течение 24 часов",
              "Бесплатная консультация",
              "NDA по запросу",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div style={{
                  width: 20, height: 20,
                  borderRadius: "50%",
                  background: "rgba(16,185,129,0.15)",
                  border: "1px solid rgba(16,185,129,0.40)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                    stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <span style={{ fontSize: 14, color: "var(--muted)" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div className="reveal reveal-delay-2">
          {sent ? (
            <div
              className="rounded-card"
              style={{
                padding: "40px 32px",
                textAlign: "center",
                background: "rgba(16,185,129,0.06)",
                border: "1px solid rgba(16,185,129,0.25)",
              }}
            >
              <div style={{
                width: 56, height: 56,
                borderRadius: "50%",
                background: "rgba(16,185,129,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 20px",
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 20, color: "var(--ink)", marginBottom: 8 }}>
                Заявка отправлена!
              </p>
              <p style={{ fontSize: 14.5, color: "var(--muted)" }}>
                Ответим в течение 24 часов.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="flex flex-col gap-3"
              noValidate
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field placeholder={c.name_placeholder}    required />
                <Field placeholder={c.company_placeholder} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field placeholder={c.position_placeholder} />
                <Field placeholder={c.contact_placeholder}  required />
              </div>

              {/* Messenger */}
              <div>
                <p style={{
                  fontFamily: "var(--font-mono)", fontSize: 11.5,
                  textTransform: "uppercase", letterSpacing: "0.10em",
                  color: "var(--muted)", marginBottom: 10,
                }}>
                  {c.messenger_label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {c.messenger_options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setMessenger(opt === messenger ? "" : opt)}
                      style={{
                        fontFamily: "var(--font-mono)", fontSize: 12.5,
                        padding: "6px 16px", borderRadius: 50, minHeight: 36,
                        border: `1px solid ${messenger === opt ? "var(--primary)" : "var(--border)"}`,
                        background: messenger === opt ? "rgba(16,185,129,0.15)" : "transparent",
                        color: messenger === opt ? "var(--primary)" : "var(--muted)",
                        cursor: "pointer", transition: "all 0.2s ease",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <TextArea placeholder={c.task_placeholder} />

              <button type="submit" className="btn-primary w-full mt-1">
                {c.submit}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
