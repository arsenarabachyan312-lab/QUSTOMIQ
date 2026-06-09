"use client";

import { useLang } from "@/lib/LangContext";

export default function WhyUs() {
  const { t } = useLang();
  const w = t.whyus;

  return (
    <section
      className="py-20 md:py-28 px-6 md:px-14 bg-[var(--bg)]"
      aria-labelledby="whyus-heading"
    >
      <div className="max-w-[1200px] mx-auto">
        <h2
          id="whyus-heading"
          className="font-display font-bold text-[clamp(36px,5vw,52px)] tracking-[-1.5px] mb-14 text-center"
        >
          {w.heading}
        </h2>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-6 md:gap-10">
          {w.items.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-3 p-6 md:p-8 rounded-card bg-white dark:bg-white/[0.04] shadow-card border border-[var(--line)]"
            >
              <span className="font-display font-bold text-[clamp(18px,2vw,22px)] leading-snug tracking-[-0.5px] text-ink">
                {item.title}
              </span>
              <span className="text-[13.5px] text-muted leading-[1.55] font-medium">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
