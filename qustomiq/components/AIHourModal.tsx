"use client";

import { useState, useEffect, useRef } from "react";
import { useLang } from "@/lib/LangContext";

interface Props {
  deptContext: string;
  onClose: () => void;
}

export default function AIHourModal({ deptContext, onClose }: Props) {
  const { t } = useLang();
  const m = t.ai.hourModal;
  const [sent, setSent] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

      {/* Panel */}
      <div className="relative w-full max-w-[480px] bg-bg rounded-card shadow-card-lg border border-[var(--line)] p-8 z-10">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full text-muted hover:text-ink hover:bg-[var(--line)] transition-colors"
          aria-label="Закрыть"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {sent ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="font-display font-bold text-[20px] tracking-[-0.3px] mb-2">
              {m.success.split("!")[0]}!
            </p>
            <p className="text-[14.5px] text-muted leading-[1.6]">
              {m.success.split("!")[1]?.trim()}
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[1.5px] text-accent bg-accent/10 px-3 py-1.5 rounded-pill mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                {deptContext}
              </div>
              <h2
                id="modal-title"
                className="font-display font-bold text-[24px] tracking-[-0.5px] leading-tight mb-2"
              >
                {m.title}
              </h2>
              <p className="text-[14.5px] text-muted leading-[1.6]">{m.desc}</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
              <input
                type="text"
                placeholder={m.name}
                required
                className="w-full px-4 py-3.5 rounded-btn bg-[var(--bg)] border border-[var(--line)] text-ink placeholder:text-muted focus:outline-none focus:border-accent text-[15px] font-body transition-colors"
              />
              <input
                type="text"
                placeholder={m.contact}
                required
                className="w-full px-4 py-3.5 rounded-btn bg-[var(--bg)] border border-[var(--line)] text-ink placeholder:text-muted focus:outline-none focus:border-accent text-[15px] font-body transition-colors"
              />
              <textarea
                placeholder={m.question}
                rows={3}
                className="w-full px-4 py-3.5 rounded-btn bg-[var(--bg)] border border-[var(--line)] text-ink placeholder:text-muted focus:outline-none focus:border-accent text-[15px] font-body transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full mt-1 bg-accent text-[#070b10] font-display font-bold text-[15px] py-4 rounded-btn hover:opacity-90 transition-opacity tracking-[-0.2px] min-h-[52px]"
              >
                {m.submit}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
