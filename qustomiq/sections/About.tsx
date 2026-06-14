"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { EASE_OUT } from "@/lib/animations";

const PARAGRAPHS = [
  "QUSTOMIQ — новая компания, но не новые люди. Мы — инженеры, которые годами строили системы для крупного бизнеса: SFA-платформы, документооборот, интеграции на сотни тысяч операций в день.",
  "Объединились, чтобы делать это без бюрократии корпораций — напрямую, быстро, с полной ответственностью за результат.",
  "Каждый проект ведёт тот, кто его архитектурно проектирует. Без передачи между отделами, без потери контекста.",
] as const;

/* ── Animated counter (used for "10+ лет") ───────────────── */
function AnimCounter({
  value,
  suffix,
  label,
}: {
  value:  number;
  suffix: string;
  label:  string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const numRef  = useRef<HTMLSpanElement>(null);
  const reduce  = useReducedMotion();
  const inView  = useInView(wrapRef, { once: true, margin: "0px 0px -40px 0px" });

  useEffect(() => {
    if (!inView || !numRef.current) return;
    if (reduce) {
      numRef.current.textContent = String(value);
      return;
    }
    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val:      value,
        duration: 1.8,
        ease:     "power2.out",
        delay:    0.4,
        onUpdate() {
          if (numRef.current) numRef.current.textContent = String(Math.round(obj.val));
        },
      });
    });
    return () => ctx.revert();
  }, [inView, value, reduce]);

  return (
    <div ref={wrapRef}>
      <div
        style={{
          fontFamily:    "var(--font-display)",
          fontWeight:    700,
          fontSize:      32,
          letterSpacing: "-0.03em",
          color:         "var(--text-primary)",
          lineHeight:    1,
        }}
      >
        <span ref={numRef}>0</span>{suffix}
      </div>
      <p
        style={{
          fontFamily:    "var(--font-mono)",
          fontSize:      11,
          color:         "var(--text-hint)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          paddingTop:    10,
          lineHeight:    1.4,
          margin:        0,
        }}
      >
        {label}
      </p>
    </div>
  );
}

/* ── Static stat item ─────────────────────────────────────── */
function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div
        style={{
          fontFamily:    "var(--font-display)",
          fontWeight:    700,
          fontSize:      32,
          letterSpacing: "-0.03em",
          color:         "var(--text-primary)",
          lineHeight:    1,
        }}
      >
        {value}
      </div>
      <p
        style={{
          fontFamily:    "var(--font-mono)",
          fontSize:      11,
          color:         "var(--text-hint)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          paddingTop:    10,
          lineHeight:    1.4,
          margin:        0,
        }}
      >
        {label}
      </p>
    </div>
  );
}

/* ── Section ──────────────────────────────────────────────── */
export default function About() {
  const reduce = useReducedMotion();

  return (
    <section
      id="about"
      style={{
        paddingBlock: 120,
        background:   "var(--obsidian)",
      }}
    >
      <div className="q-container">

        {/* Asymmetric 2-col: 2fr (left) / 3fr (right) */}
        <div
          className="grid grid-cols-1 md:grid-cols-[2fr_3fr]"
          style={{ gap: "clamp(3rem, 8vw, 6rem)", alignItems: "start" }}
        >

          {/* Left — eyebrow + H2 */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: EASE_OUT }}
          >
            <span
              className="eyebrow"
              style={{ marginBottom: 20, display: "block" }}
            >
              О КОМАНДЕ
            </span>
            <h2
              style={{
                fontFamily:    "var(--font-display)",
                fontWeight:    700,
                fontSize:      "clamp(1.75rem, 3.5vw, 2.5rem)",
                lineHeight:    1.15,
                letterSpacing: "-0.03em",
                color:         "var(--text-primary)",
              }}
            >
              Опыт enterprise.
              <br />
              Скорость стартапа.
            </h2>
          </motion.div>

          {/* Right — body copy */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {PARAGRAPHS.map((text, i) => (
              <motion.p
                key={i}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 + i * 0.1 }}
                style={{
                  fontSize:   17,
                  color:      "var(--text-muted)",
                  lineHeight: 1.75,
                  margin:     0,
                }}
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Stat row — full width below both columns */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.25 }}
          style={{
            marginTop:           "clamp(3rem, 6vw, 5rem)",
            paddingTop:          "clamp(2rem, 4vw, 3rem)",
            borderTop:           "1px solid rgba(255,255,255,0.06)",
            display:             "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap:                 "clamp(2rem, 4vw, 3rem)",
          }}
        >
          <AnimCounter value={10} suffix="+ лет" label="средний опыт в команде" />
          <StatItem value="Enterprise" label="уровень предыдущих клиентов" />
          <StatItem value="0" label="посредников между вами и инженером" />
        </motion.div>

      </div>
    </section>
  );
}
