"use client";

import { useLang } from "@/lib/LangContext";

export default function Clients() {
  const { t } = useLang();
  const { label, names } = t.clients;
  // Duplicate for seamless loop
  const doubled = [...names, ...names];

  return (
    <section className="py-12 border-y border-[var(--line)] overflow-hidden" aria-label={label}>
      <div className="px-6 md:px-14 mb-5">
        <p className="font-mono text-[12px] uppercase tracking-[2px] text-muted opacity-70">
          {label}
        </p>
      </div>
      <div className="relative">
        <div className="ticker-track flex gap-12 w-max">
          {doubled.map((name, i) => (
            <span
              key={i}
              className="font-display font-semibold text-[17px] text-muted opacity-60 whitespace-nowrap shrink-0"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
