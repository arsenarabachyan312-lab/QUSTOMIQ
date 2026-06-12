"use client";

import { useLang } from "@/lib/LangContext";
import SectionBg from "@/components/SectionBg";

export default function Process() {
  const { t } = useLang();
  const p = t.process;

  return (
    <section
      id="process"
      className="py-20 md:py-28 px-6 md:px-14 relative"
      style={{ background: "var(--surface)" }}
      aria-labelledby="process-heading"
    >
      <SectionBg />
      <div className="relative z-[1] max-w-[1200px] mx-auto">
        <div className="mb-14 reveal">
          <span className="section-label">Как мы работаем</span>
          <h2 id="process-heading" className="mb-4">{p.heading}</h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, maxWidth: 520 }}>{p.sub}</p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-0 relative">
          {/* Connector line — desktop */}
          <div
            className="hidden xl:block absolute top-[28px] left-[calc(12.5%)] right-[calc(12.5%)] h-px z-0"
            style={{ background: "var(--border)" }}
            aria-hidden="true"
          />

          {p.steps.map((step, i) => (
            <div
              key={i}
              className={`relative z-10 flex flex-col items-start sm:items-center sm:text-center xl:items-center xl:text-center px-0 sm:px-4 xl:px-4 mb-10 xl:mb-0 reveal reveal-delay-${i + 1}`}
            >
              {/* Number bubble */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 56, height: 56, borderRadius: "50%",
                border: "1px solid var(--border)",
                background: "var(--surface-2)",
                marginBottom: 20,
                fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 13,
                color: "var(--primary)", letterSpacing: "1px",
              }}>
                {step.n}
              </div>

              {/* Vertical connector — mobile only */}
              {i < p.steps.length - 1 && (
                <div
                  className="sm:hidden absolute left-7 top-14 w-px h-10"
                  style={{ background: "var(--border)" }}
                  aria-hidden="true"
                />
              )}

              <h3 className="font-display font-semibold mb-2" style={{ fontSize: 18, letterSpacing: "-0.3px" }}>
                {step.title}
              </h3>
              <p style={{ fontSize: 14.5, color: "var(--muted)", lineHeight: 1.65 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
