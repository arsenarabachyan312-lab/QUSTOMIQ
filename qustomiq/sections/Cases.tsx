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
          <p className="text-[17px] text-muted leading-[1.6]">{c.sub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {c.items.map((item, i) => (
            <article
              key={i}
              className="bg-white dark:bg-white/[0.04] rounded-card p-7 shadow-card border border-[var(--line)] hover:shadow-card-lg hover:-translate-y-1 transition-all duration-200 flex flex-col gap-4"
            >
              {/* Placeholder badge */}
              {item.placeholder && (
                <span className="self-start font-mono text-[10.5px] uppercase tracking-[1.5px] text-muted/60 border border-[var(--line)] px-2.5 py-1 rounded-pill">
                  placeholder
                </span>
              )}

              <div>
                <h3 className="font-display font-semibold text-[19px] tracking-[-0.3px]">{item.client}</h3>
                <span className="font-mono text-[12px] text-accent-ink dark:text-accent tracking-[0.5px] uppercase">
                  {item.industry}
                </span>
              </div>

              <p className="text-[14.5px] text-muted leading-[1.65] flex-1">{item.result}</p>

              <div className="pt-2 border-t border-[var(--line)]">
                <span className="text-[13.5px] font-semibold text-ink/50 dark:text-ink/40">
                  Подробнее →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
