"use client";

import { useLang } from "@/lib/LangContext";
import SectionBg from "@/components/SectionBg";

const icons = [
  // Code / development
  <svg key="dev" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>,
  // Integration / link
  <svg key="int" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>,
  // AI / brain
  <svg key="ai" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.26A7 7 0 0 1 12 2z" />
    <line x1="10" y1="20" x2="14" y2="20" /><line x1="10" y1="22" x2="14" y2="22" />
  </svg>,
  // Support / shield
  <svg key="sup" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>,
];

export default function Services() {
  const { t } = useLang();
  const s = t.services;

  return (
    <section id="services" className="py-20 md:py-28 px-6 md:px-14 relative" aria-labelledby="services-heading">
      <SectionBg />
      <div className="relative z-[1] max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-14">
          <h2
            id="services-heading"
            className="font-display font-bold text-[clamp(36px,5vw,52px)] tracking-[-1.5px] mb-4"
          >
            {s.heading}
          </h2>
          <p className="text-[17px] text-muted max-w-[460px] leading-[1.6]">{s.sub}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {s.items.map((item, i) => (
            <article
              key={i}
              className="bg-white dark:bg-white/[0.04] rounded-card p-7 shadow-card border border-[var(--line)] hover:shadow-card-lg hover:-translate-y-1 transition-all duration-200 flex flex-col"
            >
              {/* Icon */}
              <div className="text-accent mb-5">{icons[i]}</div>

              {/* Title */}
              <h3 className="font-display font-semibold text-[19px] tracking-[-0.3px] mb-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[14.5px] text-muted leading-[1.65] flex-1">{item.desc}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11.5px] px-[10px] py-[5px] rounded-pill bg-[var(--bg)] border border-[var(--line)] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
