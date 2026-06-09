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
      <section id="ai" className="py-20 md:py-28 px-6 md:px-14 bg-[var(--bg)] relative" aria-labelledby="ai-heading">
        <SectionBg />
        <div className="relative z-[1] max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h2
              id="ai-heading"
              className="font-display font-bold text-[clamp(36px,5vw,52px)] tracking-[-1.5px] mb-4"
            >
              {ai.heading}
            </h2>
            <p className="text-[17px] text-muted max-w-[460px] leading-[1.6]">{ai.sub}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            {/* Tab switcher */}
            <div className="flex flex-row lg:flex-col gap-3 flex-wrap">
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActive(i)}
                  className={`font-body font-semibold text-[15px] px-5 py-3 rounded-pill border transition-all duration-150 text-left min-h-[44px] ${
                    active === i
                      ? "bg-accent text-[#0D1B2A] border-accent"
                      : "bg-transparent text-muted border-[var(--line)] hover:border-ink/30 hover:text-ink"
                  }`}
                  aria-pressed={active === i}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Dept card */}
            <div
              key={active}
              className="bg-white dark:bg-white/[0.04] rounded-card p-8 shadow-card border border-[var(--line)] animate-[fadeUp_.4s_ease_both]"
            >
              {/* Header row */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-display font-bold text-[22px] tracking-[-0.5px] mb-1">
                    {dept.title}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[1.5px] text-accent bg-accent/10 px-3 py-1 rounded-pill">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {ai.live}
                  </span>
                </div>
                {/* Metric */}
                <div className="text-right shrink-0">
                  <div className="font-display font-bold text-[42px] leading-none tracking-[-2px] text-accent-deep dark:text-accent">
                    {dept.metric}
                  </div>
                  <div className="text-[13px] text-muted mt-1">{dept.metricLabel}</div>
                </div>
              </div>

              {/* Tasks */}
              <ul className="flex flex-col gap-2 mb-6">
                {dept.tasks.map((task) => (
                  <li key={task} className="flex items-center gap-3 text-[15px]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent shrink-0" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {task}
                  </li>
                ))}
              </ul>

              {/* Stack chips */}
              <div className="flex flex-wrap gap-2 mb-6">
                {dept.stack.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[11.5px] px-[10px] py-[5px] rounded-pill bg-[var(--bg)] border border-[var(--line)] text-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Hour with AI CTA */}
              <div className="pt-5 border-t border-[var(--line)] flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="font-semibold text-[14.5px] mb-0.5">
                    Какой AI подойдёт именно вам?
                  </p>
                  <p className="text-[13px] text-muted">Бесплатная 60-минутная сессия с экспертом</p>
                </div>
                <button
                  onClick={() => setModalOpen(true)}
                  className="flex items-center gap-2 bg-accent text-[#070b10] font-display font-bold text-[14px] px-5 py-3 rounded-pill hover:opacity-90 transition-opacity whitespace-nowrap min-h-[44px] shrink-0"
                >
                  {ai.hourCta}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalOpen && (
        <AIHourModal
          deptContext={dept.hourContext}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
