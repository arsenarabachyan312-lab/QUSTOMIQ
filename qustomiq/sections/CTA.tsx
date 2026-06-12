"use client";
import { useState, useId } from "react";
import { useLang } from "@/lib/LangContext";
import SectionBg from "@/components/SectionBg";

/* ── Floating label field ─────────────────────────────────── */
function FloatField({
  id, label, type = "text", required = false,
}: {
  id: string; label: string; type?: string; required?: boolean;
}) {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState("");
  const lifted = focus || value.length > 0;

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        autoComplete="off"
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          width: "100%", paddingTop: 22, paddingBottom: 10,
          paddingLeft: 18, paddingRight: 18,
          minHeight: 58,
          borderRadius: 14,
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${focus ? "var(--primary)" : "var(--border)"}`,
          color: "var(--ink)", fontSize: 15,
          fontFamily: "var(--font-body)", outline: "none",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          boxShadow: focus ? "0 0 0 3px rgba(16,185,129,0.15)" : "none",
        }}
      />
      <label
        htmlFor={id}
        style={{
          position: "absolute",
          left: 18,
          top: lifted ? 8 : "50%",
          transform: lifted ? "translateY(0)" : "translateY(-50%)",
          fontSize: lifted ? 10.5 : 15,
          color: focus ? "var(--primary)" : "var(--muted)",
          transition: "all 0.20s cubic-bezier(0.23,1,0.32,1)",
          pointerEvents: "none",
          fontFamily: "var(--font-body)",
          fontWeight: lifted ? 600 : 400,
          letterSpacing: lifted ? "0.08em" : 0,
          textTransform: lifted ? "uppercase" : "none",
        }}
      >
        {label}
      </label>
    </div>
  );
}

/* ── Floating label textarea ─────────────────────────────── */
function FloatTextarea({ id, label }: { id: string; label: string }) {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState("");
  const lifted = focus || value.length > 0;

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <textarea
        id={id}
        value={value}
        rows={4}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          width: "100%", paddingTop: 30, paddingBottom: 12,
          paddingLeft: 18, paddingRight: 18, resize: "none",
          borderRadius: 14,
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${focus ? "var(--primary)" : "var(--border)"}`,
          color: "var(--ink)", fontSize: 15,
          fontFamily: "var(--font-body)", outline: "none",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          boxShadow: focus ? "0 0 0 3px rgba(16,185,129,0.15)" : "none",
        }}
      />
      <label
        htmlFor={id}
        style={{
          position: "absolute", left: 18,
          top: lifted ? 10 : 18,
          fontSize: lifted ? 10.5 : 15,
          color: focus ? "var(--primary)" : "var(--muted)",
          transition: "all 0.20s cubic-bezier(0.23,1,0.32,1)",
          pointerEvents: "none", fontFamily: "var(--font-body)",
          fontWeight: lifted ? 600 : 400,
          letterSpacing: lifted ? "0.08em" : 0,
          textTransform: lifted ? "uppercase" : "none",
        }}
      >
        {label}
      </label>
    </div>
  );
}

export default function CTA() {
  const { t } = useLang();
  const c = t.cta;
  const uid = useId();
  const [sent, setSent] = useState(false);
  const [messenger, setMessenger] = useState("");

  return (
    <section
      id="contacts"
      className="py-20 md:py-28 px-6 md:px-14 relative overflow-hidden"
      style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}
      aria-labelledby="cta-heading"
    >
      {/* Animated gradient background */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(16,185,129,0.06) 0%, transparent 70%)",
        animation: "ctaPulse 6s ease-in-out infinite",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 60% 80% at 80% 20%, rgba(167,139,250,0.05) 0%, transparent 70%)",
        animation: "ctaPulse 9s ease-in-out infinite reverse",
      }} />

      <SectionBg />

      <div className="relative z-[1] max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <div className="reveal">
          <span className="section-label">Контакты</span>
          <h2 id="cta-heading" className="mb-5">{c.heading}</h2>
          <p className="mb-8" style={{ maxWidth: 440 }}>{c.sub}</p>

          <div className="flex items-center gap-3 flex-wrap" style={{ fontSize: 14, color: "var(--muted)" }}>
            <span>{c.or}</span>
            <a href={`mailto:${c.email}`} className="no-underline transition-colors duration-200"
              style={{ color: "var(--primary)" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
              {c.email}
            </a>
          </div>

          <div className="mt-10 flex flex-col gap-4">
            {["Ответ в течение 24 часов", "Бесплатная консультация", "NDA по запросу"].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div style={{
                  width: 20, height: 20, borderRadius: "50%",
                  background: "rgba(16,185,129,0.15)",
                  border: "1px solid rgba(16,185,129,0.40)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
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
            <div className="rounded-card" style={{
              padding: "40px 32px", textAlign: "center",
              background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.25)",
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
                background: "rgba(16,185,129,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px",
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 20, color: "var(--ink)", marginBottom: 8 }}>
                Заявка отправлена!
              </p>
              <p style={{ fontSize: 14.5, color: "var(--muted)" }}>Ответим в течение 24 часов.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="flex flex-col gap-3" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FloatField id={`${uid}-name`}     label={c.name_placeholder}     required />
                <FloatField id={`${uid}-company`}  label={c.company_placeholder} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FloatField id={`${uid}-position`} label={c.position_placeholder} />
                <FloatField id={`${uid}-contact`}  label={c.contact_placeholder}  required />
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
                    <button key={opt} type="button"
                      onClick={() => setMessenger(opt === messenger ? "" : opt)}
                      style={{
                        fontFamily: "var(--font-mono)", fontSize: 12.5,
                        padding: "6px 16px", borderRadius: 50, minHeight: 40,
                        border: `1px solid ${messenger === opt ? "var(--primary)" : "var(--border)"}`,
                        background: messenger === opt ? "rgba(16,185,129,0.15)" : "transparent",
                        color: messenger === opt ? "var(--primary)" : "var(--muted)",
                        cursor: "pointer", transition: "all 0.2s ease",
                      }}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <FloatTextarea id={`${uid}-task`} label={c.task_placeholder} />

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
