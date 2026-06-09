"use client";

import { useLang } from "@/lib/LangContext";
import SectionBg from "@/components/SectionBg";

export default function About() {
  const { t } = useLang();
  const a = t.about;

  return (
    <section
      id="about"
      className="py-20 md:py-28 px-6 md:px-14 bg-[var(--bg)] relative"
      aria-labelledby="about-heading"
    >
      <SectionBg />
      <div className="relative z-[1] max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <h2
              id="about-heading"
              className="font-display font-bold text-[clamp(32px,4.5vw,48px)] tracking-[-1.5px] mb-8"
            >
              {a.heading}
            </h2>
            <div className="flex flex-col gap-5">
              {a.paragraphs.map((p, i) => (
                <p key={i} className="text-[16px] text-muted leading-[1.75]">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {[
              { n: "01", text: "Не сдаём код и исчезаем" },
              { n: "02", text: "Остаёмся технологическим партнёром" },
              { n: "03", text: "Берём ответственность за результат" },
            ].map((item) => (
              <div
                key={item.n}
                className="flex items-center gap-5 p-5 rounded-card bg-white dark:bg-white/[0.04] border border-[var(--line)] shadow-card"
              >
                <span className="font-mono text-[13px] text-accent-ink dark:text-accent tracking-[1px] shrink-0">
                  {item.n}
                </span>
                <span className="font-display font-semibold text-[16px] tracking-[-0.2px] text-ink">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
