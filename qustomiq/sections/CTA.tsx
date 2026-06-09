"use client";

import { useState } from "react";
import { useLang } from "@/lib/LangContext";
import SectionBg from "@/components/SectionBg";

const fieldCls =
  "w-full px-5 py-4 rounded-btn bg-[#F0EEE8]/[0.07] border border-[#F0EEE8]/[0.12] text-[#F0EEE8] placeholder:text-[#F0EEE8]/40 focus:outline-none focus:border-accent text-[15px] font-body transition-colors";

export default function CTA() {
  const { t } = useLang();
  const c = t.cta;
  const [sent, setSent] = useState(false);
  const [messenger, setMessenger] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section
      id="contacts"
      className="py-20 md:py-28 px-6 md:px-14 text-[#F0EEE8] relative"
      style={{
        background:
          "radial-gradient(ellipse at 80% 50%, rgba(240,165,0,0.12) 0%, transparent 60%), " +
          "radial-gradient(ellipse at 20% 50%, rgba(240,165,0,0.07) 0%, transparent 50%), " +
          "#071220",
        borderTop: "1px solid rgba(240,165,0,0.2)",
      }}
      aria-labelledby="cta-heading"
    >
      <SectionBg />
      <div className="relative z-[1] max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <div>
          <h2
            id="cta-heading"
            className="font-display font-bold text-[clamp(36px,4.5vw,52px)] tracking-[-1.5px] leading-[1.05] mb-5"
          >
            {c.heading}
          </h2>
          <p className="text-[17px] leading-[1.65] opacity-70 mb-8">{c.sub}</p>

          <div className="flex items-center gap-3 opacity-70 text-[14.5px]">
            <span>{c.or}</span>
            <a
              href={`mailto:${c.email}`}
              className="text-accent underline underline-offset-2 hover:opacity-80 transition-opacity"
            >
              {c.email}
            </a>
          </div>
        </div>

        {/* Right — form */}
        <div>
          {sent ? (
            <div className="rounded-card bg-[#F0EEE8]/[0.06] p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-5">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="font-display font-semibold text-[20px]">Заявка отправлена!</p>
              <p className="text-[14.5px] opacity-70 mt-2">Ответим в течение 24 часов.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
              {/* Row: Имя + Компания */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder={c.name_placeholder}
                  required
                  className={fieldCls}
                />
                <input
                  type="text"
                  placeholder={c.company_placeholder}
                  className={fieldCls}
                />
              </div>

              {/* Row: Должность + Телефон/email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder={c.position_placeholder}
                  className={fieldCls}
                />
                <input
                  type="text"
                  placeholder={c.contact_placeholder}
                  required
                  className={fieldCls}
                />
              </div>

              {/* Мессенджер — кнопки-пилюли */}
              <div>
                <p className="text-[13px] text-[#F0EEE8]/50 mb-2 font-mono uppercase tracking-[1px]">
                  {c.messenger_label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {c.messenger_options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setMessenger(opt === messenger ? "" : opt)}
                      className={`font-mono text-[12.5px] px-4 py-2 rounded-pill border transition-all min-h-[36px] ${
                        messenger === opt
                          ? "bg-accent text-[#0D1B2A] border-accent font-semibold"
                          : "bg-transparent text-[#F0EEE8]/60 border-[#F0EEE8]/15 hover:border-[#F0EEE8]/40"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Задача */}
              <textarea
                placeholder={c.task_placeholder}
                rows={3}
                className={`${fieldCls} resize-none`}
              />

              <button
                type="submit"
                className="w-full mt-1 bg-accent text-[#0D1B2A] font-display font-bold text-[15.5px] py-[17px] rounded-btn hover:opacity-90 transition-opacity min-h-[52px] tracking-[-0.2px]"
              >
                {c.submit}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
