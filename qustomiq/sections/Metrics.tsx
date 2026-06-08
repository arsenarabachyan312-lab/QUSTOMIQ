"use client";

import { useLang } from "@/lib/LangContext";

export default function Metrics() {
  const { t } = useLang();
  const m = t.metrics;

  return (
    <section
      className="py-20 md:py-28 px-6 md:px-14 bg-[var(--bg)]"
      aria-labelledby="metrics-heading"
    >
      <div className="max-w-[1200px] mx-auto">
        <h2
          id="metrics-heading"
          className="font-display font-bold text-[clamp(36px,5vw,52px)] tracking-[-1.5px] mb-14 text-center"
        >
          {m.heading}
        </h2>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-6 md:gap-10">
          {m.items.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-3 p-6 md:p-8 rounded-card bg-white dark:bg-white/[0.04] shadow-card border border-[var(--line)]"
            >
              <span className="font-display font-bold text-[clamp(40px,5vw,56px)] leading-none tracking-[-2.5px] text-accent-deep dark:text-accent">
                {item.value}
              </span>
              <span className="text-[13.5px] text-muted leading-[1.5] font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
