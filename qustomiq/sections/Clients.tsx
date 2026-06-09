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
      className="py-12 border-b border-[#F0A500]/15 overflow-hidden relative text-[#F0EEE8]"
      style={{
        background:
          "radial-gradient(ellipse at 80% 50%, rgba(240,165,0,0.12) 0%, transparent 60%), " +
          "radial-gradient(ellipse at 20% 50%, rgba(240,165,0,0.07) 0%, transparent 50%), " +
          "#071220",
        borderTop: "1px solid rgba(240,165,0,0.2)",
      }}
      aria-label={label}
    >
      <SectionBg darkBg />
      <div className="relative z-[1]">
        <div className="px-6 md:px-14 mb-5">
          <p className="font-mono text-[12px] uppercase tracking-[2px] text-accent dark:text-accent">
            {label}
          </p>
        </div>
        <div className="relative">
          <div className="ticker-track flex gap-12 w-max">
            {doubled.map((name, i) => (
              <span
                key={i}
                className="font-display font-semibold text-[17px] text-[#F0EEE8]/75 whitespace-nowrap shrink-0"
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
