"use client";

import { useLang } from "@/lib/LangContext";

export default function Partner() {
  const { t } = useLang();
  const p = t.partner;

  return (
    <section
      className="py-20 md:py-28 px-6 md:px-14 bg-ink text-white dark:bg-white/[0.03] dark:text-ink"
      aria-labelledby="partner-heading"
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-start">
        {/* Left: headline */}
        <div>
          <h2
            id="partner-heading"
            className="font-display font-bold text-[clamp(36px,4.5vw,52px)] tracking-[-1.5px] leading-[1.05] mb-5"
          >
            {p.heading}
          </h2>
          <p className="text-[17px] leading-[1.65] opacity-70">{p.sub}</p>
        </div>

        {/* Right: principles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {p.principles.map((item, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-mono text-[11px] text-accent tracking-[1.5px] uppercase opacity-80">
                  0{i + 1}
                </span>
                <div className="h-px flex-1 bg-white/10 dark:bg-ink/10" />
              </div>
              <h3 className="font-display font-semibold text-[17px] leading-tight">{item.title}</h3>
              <p className="text-[14px] leading-[1.65] opacity-65">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
