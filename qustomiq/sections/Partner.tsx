"use client";

import { useLang } from "@/lib/LangContext";
import SectionBg from "@/components/SectionBg";

export default function Partner() {
  const { t } = useLang();
  const p = t.partner;

  return (
    <section
      className="py-20 md:py-28 px-6 md:px-14 relative"
      style={{ background: "var(--surface-2)" }}
      aria-labelledby="partner-heading"
    >
      <SectionBg />
      <div className="relative z-[1] max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-start">
        {/* Left */}
        <div className="reveal">
          <span className="section-label">Партнёрство</span>
          <h2 id="partner-heading" className="mb-5">{p.heading}</h2>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: "var(--muted)" }}>{p.sub}</p>
        </div>

        {/* Right: principles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {p.principles.map((item, i) => (
            <div key={i} className={`reveal reveal-delay-${i + 1} flex flex-col gap-2`}>
              <div className="flex items-center gap-3 mb-1">
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: 11,
                  color: i % 2 === 0 ? "var(--primary)" : "var(--secondary)",
                  letterSpacing: "1.5px", textTransform: "uppercase", opacity: 0.9,
                }}>
                  0{i + 1}
                </span>
                <div style={{ height: 1, flex: 1, background: "var(--border)" }} />
              </div>
              <h3 className="font-display font-semibold" style={{ fontSize: 17, lineHeight: 1.3 }}>
                {item.title}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--muted)" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
