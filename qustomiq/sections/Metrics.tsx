"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ru } from "@/lib/i18n/ru";
import { EASE_OUT } from "@/lib/animations";

function Counter({
  value,
  suffix,
  label,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  index: number;
}) {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const numRef   = useRef<HTMLSpanElement>(null);
  const barRef   = useRef<HTMLDivElement>(null);
  const reduce   = useReducedMotion();
  const inView   = useInView(wrapRef, { once: true, margin: "0px 0px -60px 0px" });

  useEffect(() => {
    if (!inView || !numRef.current) return;
    if (reduce) {
      numRef.current.textContent = value + suffix;
      return;
    }
    const delay = index * 0.12;
    const obj   = { val: 0 };
    const ctx   = gsap.context(() => {
      gsap.to(obj, {
        val: value,
        duration: 2,
        ease: "power2.out",
        delay,
        onUpdate() {
          if (numRef.current) {
            numRef.current.textContent = Math.round(obj.val) + suffix;
          }
        },
      });
      if (barRef.current) {
        gsap.fromTo(
          barRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.6, ease: "power2.out", delay }
        );
      }
    });
    return () => ctx.revert();
  }, [inView, value, suffix, reduce, index]);

  return (
    <div
      ref={wrapRef}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}
    >
      {/* Number */}
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(2.4rem, 5vw, 3.5rem)",
          color: "var(--text-primary)",
          lineHeight: 1,
          letterSpacing: "-0.03em",
        }}
      >
        <span ref={numRef}>0{suffix}</span>
      </div>

      {/* Emerald bar */}
      <div
        style={{
          width: 40,
          height: 2,
          background: "rgba(255,255,255,0.08)",
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        <div
          ref={barRef}
          style={{
            width: "100%",
            height: "100%",
            background: "var(--emerald)",
            transformOrigin: "left",
            transform: "scaleX(0)",
          }}
        />
      </div>

      {/* Label */}
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--text-hint)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          textAlign: "center",
          lineHeight: 1.4,
        }}
      >
        {label}
      </p>
    </div>
  );
}

export default function Metrics() {
  const reduce   = useReducedMotion();
  const { items } = ru.metrics;

  return (
    <motion.section
      initial={reduce ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      style={{
        background: "linear-gradient(135deg, #050505 0%, #0B0F0E 100%)",
        borderTop:    "1px solid rgba(16,185,129,0.2)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        paddingBlock: "clamp(3rem, 7vw, 5rem)",
      }}
    >
      <div className="q-container">
        <div className="grid grid-cols-2 sm:grid-cols-4" style={{ gap: 0 }}>
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                paddingInline: "clamp(1rem, 3vw, 2.5rem)",
                borderRight: i < items.length - 1
                  ? "1px solid rgba(255,255,255,0.06)"
                  : "none",
              }}
            >
              <Counter
                value={item.value}
                suffix={item.suffix}
                label={item.label}
                index={i}
              />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
