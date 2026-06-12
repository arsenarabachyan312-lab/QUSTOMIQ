"use client";

import { useLang } from "@/lib/LangContext";
import SectionBg from "@/components/SectionBg";
import type { MouseEvent } from "react";

function spotlight(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r  = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width  * 100).toFixed(1)}%`);
  el.style.setProperty("--my", `${((e.clientY - r.top)  / r.height * 100).toFixed(1)}%`);
}

export default function WhyUs() {
  const { t } = useLang();
  const w = t.whyus;

  return (
    <section
      className="py-20 md:py-28 px-6 md:px-14 relative"
      aria-labelledby="whyus-heading"
    >
      <SectionBg />
      <div className="relative z-[1] max-w-[1200px] mx-auto">
        <div className="mb-14 reveal text-center">
          <span className="section-label">Почему мы</span>
          <h2 id="whyus-heading">{w.heading}</h2>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6">
          {w.items.map((item, i) => (
            <div
              key={i}
              className={`rounded-card spotlight-card reveal reveal-delay-${i + 1} flex flex-col items-center text-center gap-3 p-6 md:p-8 cursor-default`}
              onMouseMove={spotlight}
            >
              <div style={{
                width: 44, height: 44, borderRadius: "50%", marginBottom: 4,
                background: i % 2 === 0 ? "rgba(16,185,129,0.12)" : "rgba(167,139,250,0.12)",
                border: `1px solid ${i % 2 === 0 ? "rgba(16,185,129,0.30)" : "rgba(167,139,250,0.30)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{
                  width: 10, height: 10, borderRadius: "50%",
                  background: i % 2 === 0 ? "var(--primary)" : "var(--secondary)",
                }} />
              </div>
              <span style={{
                fontFamily: "var(--font-display)", fontWeight: 700,
                fontSize: "clamp(16px, 1.8vw, 20px)", lineHeight: 1.25,
                letterSpacing: "-0.4px", color: "var(--ink)",
              }}>
                {item.title}
              </span>
              <span style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.55 }}>
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
