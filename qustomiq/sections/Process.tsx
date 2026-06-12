"use client";

import { useLang } from "@/lib/LangContext";
import SectionBg from "@/components/SectionBg";
import { useEffect, useRef, useState } from "react";

/* ── Animated connecting line ─────────────────────────────── */
function TimelineLine({ steps }: { steps: number }) {
  const lineRef  = useRef<HTMLDivElement>(null);
  const [prog, setProgress] = useState(0);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        /* Animate width 0→100% over 1.4s */
        const start = performance.now();
        const dur   = 1400;
        const run = () => {
          const p = Math.min((performance.now() - start) / dur, 1);
          setProgress(p * 100);
          if (p < 1) requestAnimationFrame(run);
        };
        requestAnimationFrame(run);
        io.disconnect();
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={lineRef}
      className="hidden xl:block absolute top-[28px] left-[calc(12.5%)] right-[calc(12.5%)] h-px z-0"
      style={{ background: "var(--border)" }}
    >
      {/* Gradient progress fill */}
      <div style={{
        position: "absolute", inset: "0 0 0 0",
        width: `${prog}%`,
        background: "linear-gradient(90deg, #10B981 0%, #A78BFA 100%)",
        transition: "width 0.04s linear",
        boxShadow: prog > 5 ? "0 0 8px rgba(16,185,129,0.6)" : "none",
      }} />
    </div>
  );
}

/* ── Glowing step number ─────────────────────────────────── */
function StepBubble({ n, color, delay }: { n: string; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => setVisible(true), delay); io.disconnect(); } },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div ref={ref} style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      width: 56, height: 56, borderRadius: "50%",
      border: `1.5px solid ${visible ? color : "var(--border)"}`,
      background: visible ? `${color}15` : "var(--surface-2)",
      marginBottom: 20,
      fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 13,
      color: visible ? color : "var(--muted)",
      letterSpacing: "1px",
      transition: "all 0.6s cubic-bezier(0.23,1,0.32,1)",
      boxShadow: visible ? `0 0 20px ${color}40` : "none",
      willChange: "box-shadow, border-color, background",
    }}>
      {n}
    </div>
  );
}

export default function Process() {
  const { t } = useLang();
  const p = t.process;
  const colors = ["var(--primary)", "var(--secondary)", "var(--primary)", "var(--secondary)"];

  return (
    <section id="process" className="py-20 md:py-28 px-6 md:px-14 relative"
      style={{ background: "var(--surface)" }} aria-labelledby="process-heading">
      <SectionBg />
      <div className="relative z-[1] max-w-[1200px] mx-auto">
        <div className="mb-14 reveal">
          <span className="section-label">Как мы работаем</span>
          <h2 id="process-heading" className="mb-4">{p.heading}</h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, maxWidth: 520 }}>{p.sub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-0 relative">
          <TimelineLine steps={p.steps.length} />

          {p.steps.map((step, i) => (
            <div key={i}
              className={`relative z-10 flex flex-col items-start sm:items-center sm:text-center xl:items-center xl:text-center px-0 sm:px-4 xl:px-4 mb-10 xl:mb-0 reveal reveal-delay-${i + 1}`}
            >
              <StepBubble n={step.n} color={colors[i]} delay={i * 200} />

              {/* Vertical connector mobile */}
              {i < p.steps.length - 1 && (
                <div className="sm:hidden absolute left-7 top-14 w-px h-10"
                  style={{ background: "var(--border)" }} aria-hidden="true" />
              )}

              <h3 className="font-display font-semibold mb-2" style={{ fontSize: 18, letterSpacing: "-0.3px" }}>
                {step.title}
              </h3>
              <p style={{ fontSize: 14.5, color: "var(--muted)", lineHeight: 1.65 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
