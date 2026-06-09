"use client";

import { useLang } from "@/lib/LangContext";

export default function Cases() {
  const { t } = useLang();
  const c = t.cases;

  return (
    <section id="cases" className="py-20 md:py-28 px-6 md:px-14" aria-labelledby="cases-heading">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-14">
          <h2
            id="cases-heading"
            className="font-display font-bold text-[clamp(36px,5vw,52px)] tracking-[-1.5px] mb-4"
          >
            {c.heading}
          </h2>
          <p className="text-[17px] text-muted leading-[1.6] max-w-[640px]">{c.sub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {c.items.map((item, i) => (
            <article
              key={i}
              className="bg-white dark:bg-white/[0.04] rounded-card p-7 shadow-card border border-[var(--line)] hover:shadow-card-lg hover:-translate-y-1 transition-all duration-200 flex flex-col gap-5"
            >
              <h3 className="font-display font-semibold text-[18px] tracking-[-0.3px] leading-snug">
                {item.title}
              </h3>

              <div className="flex flex-col gap-4 flex-1">
                <div>
                  <span className="font-mono text-[10.5px] uppercase tracking-[1.5px] text-accent-ink dark:text-accent font-semibold">
                    {c.task_label}
                  </span>
                  <p className="mt-1.5 text-[13.5px] text-muted leading-[1.6]">{item.task}</p>
                </div>

                <div>
                  <span className="font-mono text-[10.5px] uppercase tracking-[1.5px] text-accent-ink dark:text-accent font-semibold">
                    {c.solution_label}
                  </span>
                  <p className="mt-1.5 text-[13.5px] text-muted leading-[1.6]">{item.solution}</p>
                </div>

                <div>
                  <span className="font-mono text-[10.5px] uppercase tracking-[1.5px] text-accent-ink dark:text-accent font-semibold">
                    {c.effect_label}
                  </span>
                  <p className="mt-1.5 text-[13.5px] text-ink dark:text-ink/80 leading-[1.6] font-medium">{item.effect}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
