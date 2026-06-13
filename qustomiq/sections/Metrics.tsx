"use client";

import { useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ru } from "@/lib/i18n/ru";

function Counter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref    = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduce) {
      ref.current.textContent = value + suffix;
      return;
    }
    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: value,
        duration: 1.8,
        ease: "power2.out",
        delay: 0,
        onUpdate() {
          if (ref.current) {
            ref.current.textContent = Math.round(obj.val) + suffix;
          }
        },
      });
    });
    return () => ctx.revert();
  }, [inView, value, suffix, reduce]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(2rem, 5vw, 3.2rem)",
          background: "var(--g-em)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          lineHeight: 1.1,
        }}
      >
        <span ref={ref}>0{suffix}</span>
      </div>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--mist)",
          letterSpacing: "0.08em",
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        {label}
      </p>
    </div>
  );
}

export default function Metrics() {
  const { items } = ru.metrics;

  return (
    <section
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        paddingBlock: "clamp(3rem, 7vw, 5rem)",
      }}
    >
      <div className="q-container">
        <div className="grid grid-cols-2 sm:grid-cols-4" style={{ gap: 0 }}>
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                paddingInline: "clamp(1rem, 3vw, 2rem)",
                borderRight: i < items.length - 1
                  ? "1px solid rgba(255,255,255,0.07)"
                  : "none",
              }}
            >
              <Counter value={item.value} suffix={item.suffix} label={item.label} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
