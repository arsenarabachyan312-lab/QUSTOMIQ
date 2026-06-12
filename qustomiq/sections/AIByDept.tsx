"use client";

import { useState } from "react";
import { useLang } from "@/lib/LangContext";
import AIHourModal from "@/components/AIHourModal";
import SectionBg from "@/components/SectionBg";

export default function AIByDept() {
  const { t } = useLang();
  const ai = t.ai;
  const tabs = ai.tabs;
  const [active, setActive] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const deptValues = Object.values(ai.depts);
  const dept = deptValues[active];

  return (
    <>
      <section id="ai" className="py-20 md:py-28 px-6 md:px-14 relative" aria-labelledby="ai-heading">
        <SectionBg />
        <div className="relative z-[1] max-w-[1200px] mx-auto">

          <div className="mb-12 reveal">
            <span className="section-label">AI по отделам</span>
            <h2 id="ai-heading" className="mb-4">{ai.heading}</h2>
            <p style={{ fontSize: 17, maxWidth: 460, lineHeight: 1.6 }}>{ai.sub}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
            {/* Tab switcher */}
            <div className="flex flex-row lg:flex-col gap-2 flex-wrap">
              {tabs.map((tab, i) => (
                <button key={tab} onClick={() => setActive(i)}
                  style={{
                    fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 15,
                    padding: "10px 20px", borderRadius: 50, minHeight: 44,
                    border: `1px solid ${active === i ? "var(--primary)" : "var(--border)"}`,
                    background: active === i ? "rgba(16,185,129,0.15)" : "transparent",
                    color: active === i ? "var(--primary)" : "var(--muted)",
                    cursor: "pointer", transition: "all 0.20s ease", textAlign: "left",
                  }}
                  aria-pressed={active === i}>
                  {tab}
                </button>
              ))}
            </div>

            {/* Dept card */}
            <div key={active} className="rounded-card p-5 sm:p-8"
              style={{ animation: "fadeInUp 0.35s ease both" }}>

              <div className="flex items-start justify-between gap-3 mb-6 flex-wrap">
                <div>
                  <h3 className="font-display font-bold mb-2"
                    style={{ fontSize: "clamp(18px, 2.5vw, 22px)", letterSpacing: "-0.5px" }}>
                    {dept.title}
                  </h3>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    fontFamily: "var(--font-mono)", fontSize: 11,
                    textTransform: "uppercase", letterSpacing: "1.5px",
                    color: "var(--primary)", background: "rgba(16,185,129,0.10)",
                    padding: "4px 12px", borderRadius: 50,
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--primary)", display: "inline-block" }} />
                    {ai.live}
                  </span>
                </div>

                {/* Metric with shimmer */}
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div className="font-display font-bold shimmer-text"
                    style={{ fontSize: "clamp(28px, 4vw, 42px)", lineHeight: 1, letterSpacing: "-2px" }}>
                    {dept.metric}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>{dept.metricLabel}</div>
                </div>
              </div>

              {/* Tasks */}
              <ul className="flex flex-col gap-2 mb-6" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {dept.tasks.map((task) => (
                  <li key={task} className="flex items-center gap-3" style={{ fontSize: 15 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      aria-hidden="true" style={{ flexShrink: 0 }}>
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {task}
                  </li>
                ))}
              </ul>

              {/* Stack chips */}
              <div className="flex flex-wrap gap-2 mb-6">
                {dept.stack.map((s) => (
                  <span key={s} style={{
                    fontFamily: "var(--font-mono)", fontSize: 11.5,
                    padding: "5px 10px", borderRadius: 50,
                    background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--muted)",
                  }}>
                    {s}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div style={{
                paddingTop: 20, borderTop: "1px solid var(--border)",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                gap: 16, flexWrap: "wrap",
              }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: 14.5, marginBottom: 4 }}>
                    Какой AI подойдёт именно вам?
                  </p>
                  <p style={{ fontSize: 13, color: "var(--muted)" }}>Бесплатная 60-минутная сессия</p>
                </div>
                <button onClick={() => setModalOpen(true)} className="btn-primary" style={{ flexShrink: 0 }}>
                  {ai.hourCta}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {modalOpen && (
        <AIHourModal deptContext={dept.hourContext} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
}
