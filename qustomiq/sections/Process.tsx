"use client";

import { useLang } from "@/lib/LangContext";
import SectionBg from "@/components/SectionBg";

export default function Process() {
  const { t } = useLang();
  const p = t.process;

  return (
    <section
      id="process"
      className="py-20 md:py-28 px-6 md:px-14 relative"
      aria-labelledby="process-heading"
    >
      <SectionBg />
      <div className="relative z-[1] max-w-[1200px] mx-auto">
        <div className="mb-14">
          <h2
            id="process-heading"
            className="font-display font-bold text-[clamp(36px,5vw,52px)] tracking-[-1.5px] mb-4"
          >
            {p.heading}
          </h2>
          <p className="text-[17px] text-muted leading-[1.6]">{p.sub}</p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-0 relative">
          {/* Connector line — desktop */}
          <div
            className="hidden xl:block absolute top-[28px] left-[calc(12.5%)] right-[calc(12.5%)] h-px bg-[var(--line)] z-0"
            aria-hidden="true"
          />

          {p.steps.map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-start sm:items-center sm:text-center xl:items-center xl:text-center px-0 sm:px-4 xl:px-4 mb-10 xl:mb-0">
              {/* Number bubble */}
              <div className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-[var(--line)] bg-bg mb-5 font-mono font-semibold text-[13px] text-accent tracking-[1px]">
                {step.n}
              </div>

              {/* Vertical connector — only visible in single-column layout */}
              {i < p.steps.length - 1 && (
                <div className="sm:hidden absolute left-7 top-14 w-px h-10 bg-[var(--line)]" aria-hidden="true" />
              )}

              <h3 className="font-display font-semibold text-[18px] tracking-[-0.3px] mb-2">
                {step.title}
              </h3>
              <p className="text-[14.5px] text-muted leading-[1.65]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
