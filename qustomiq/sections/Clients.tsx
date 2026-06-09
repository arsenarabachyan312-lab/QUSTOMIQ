"use client";

import { useLang } from "@/lib/LangContext";
import SectionBg from "@/components/SectionBg";

export default function Clients() {
  const { t } = useLang();
  const { label, names } = t.clients;
  // Duplicate for seamless loop
  const doubled = [...names, ...names];

  return (
    <section
      className="py-12 border-y border-white/10 dark:border-white/[0.06] overflow-hidden relative bg-ink text-white dark:bg-white/[0.03] dark:text-ink"
      aria-label={label}
    >
      <SectionBg darkBg />
      <div className="relative z-[1]">
        <div className="px-6 md:px-14 mb-5">
          <p className="font-mono text-[12px] uppercase tracking-[2px] text-white/50 dark:text-muted">
            {label}
          </p>
        </div>
        <div className="relative">
          <div className="ticker-track flex gap-12 w-max">
            {doubled.map((name, i) => (
              <span
                key={i}
                className="font-display font-semibold text-[17px] text-white/75 dark:text-muted whitespace-nowrap shrink-0"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
