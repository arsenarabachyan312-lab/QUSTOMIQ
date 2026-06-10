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
      className="py-12 relative text-[#F0EEE8]"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, rgba(248,169,31,0.15) 0%, transparent 65%), " +
          "radial-gradient(ellipse at 85% 50%, rgba(236,100,38,0.10) 0%, transparent 50%), " +
          "radial-gradient(ellipse at 15% 50%, rgba(236,100,38,0.10) 0%, transparent 50%), " +
          "linear-gradient(135deg, #1C0D08 0%, #2A1208 50%, #1C0D08 100%)",
        borderTop: "1px solid rgba(248,169,31,0.3)",
        borderBottom: "1px solid rgba(248,169,31,0.3)",
      }}
      aria-label={label}
    >
      <SectionBg />
      <div className="relative z-[1]">
        <div className="px-6 md:px-14 mb-5">
          <p className="font-mono text-[12px] uppercase tracking-[2px] text-accent dark:text-accent">
            {label}
          </p>
        </div>
        <div className="relative overflow-hidden">
          <div className="ticker-track flex gap-12 w-max">
            {doubled.map((name, i) => (
              <span
                key={i}
                className="font-display font-semibold text-[17px] text-[#F8A91F] whitespace-nowrap shrink-0"
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
