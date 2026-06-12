"use client";

import { useLang } from "@/lib/LangContext";
import SectionBg from "@/components/SectionBg";

export default function About() {
  const { t } = useLang();
  const a = t.about;

  return (
    <section
      id="about"
      className="py-20 md:py-28 px-6 md:px-14 relative"
      style={{ background: "var(--surface)" }}
      aria-labelledby="about-heading"
    >
      <SectionBg />
      <div className="relative z-[1] max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="reveal">
            <span className="section-label">О нас</span>
            <h2 id="about-heading" className="mb-8">{a.heading}</h2>
            <div className="flex flex-col gap-5">
              {a.paragraphs.map((p, i) => (
                <p key={i} style={{ fontSize: 16, lineHeight: 1.75 }}>{p}</p>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {[
              { n: "01", text: "Не сдаём код и исчезаем" },
              { n: "02", text: "Остаёмся технологическим партнёром" },
              { n: "03", text: "Берём ответственность за результат" },
            ].map((item, i) => (
              <div
                key={item.n}
                className={`reveal reveal-delay-${i + 1}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  padding: "20px 24px",
                  borderRadius: 16,
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                }}
              >
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: 12,
                  color: "var(--primary)", letterSpacing: "1px", flexShrink: 0,
                }}>
                  {item.n}
                </span>
                <span style={{
                  fontFamily: "var(--font-display)", fontWeight: 600,
                  fontSize: 16, letterSpacing: "-0.2px", color: "var(--ink)",
                }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
