"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ru } from "@/lib/i18n/ru";
import { EASE_OUT } from "@/lib/animations";

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const lineRef      = useRef<HTMLDivElement>(null);
  const reduce       = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    if (!containerRef.current || !trackRef.current) return;
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    const track = trackRef.current;

    const ctx = gsap.context(() => {
      const totalScroll = () => track.scrollWidth - window.innerWidth + 80;

      gsap.to(track, {
        x: () => -totalScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${totalScroll()}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: () => `+=${totalScroll()}`,
              scrub: 1.2,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [reduce]);

  const { eyebrow, heading, steps } = ru.process;

  return (
    <section
      id="process"
      style={{ background: "var(--obsidian)", overflow: "hidden" }}
    >
      <div ref={containerRef}>
        <div className="q-container" style={{ paddingTop: "var(--section-py)", paddingBottom: "3rem" }}>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: EASE_OUT }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 24, height: 2,
                background: "var(--g-mix)",
                borderRadius: 1,
                flexShrink: 0,
              }} />
              <span className="eyebrow">{eyebrow}</span>
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>{heading}</h2>
          </motion.div>

          <div
            style={{
              marginTop: 40,
              height: 1,
              background: "var(--border)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              ref={lineRef}
              style={{
                position: "absolute",
                inset: 0,
                background: "var(--g-em)",
                transformOrigin: "left",
                transform: "scaleX(0)",
              }}
            />
          </div>
        </div>

        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: "1.5rem",
            paddingInline: "var(--section-px)",
            paddingBottom: "var(--section-py)",
            width: "max-content",
          }}
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={reduce ? false : { opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE_OUT, delay: i * 0.1 }}
              style={{
                flexShrink: 0,
                width: "clamp(280px, 28vw, 360px)",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 20,
                padding: "36px 32px",
                position: "relative",
                overflow: "hidden",
                transition: "border-color 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(16,185,129,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: -10, right: 16,
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  fontSize: 110,
                  color: "rgba(255,255,255,0.03)",
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                {step.n}
              </div>

              <span className="eyebrow" style={{ marginBottom: 16 }}>{step.label}</span>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  marginBottom: 14,
                  lineHeight: 1.2,
                }}
              >
                {step.title}
              </h3>
              <p style={{ color: "var(--mist)", fontSize: 15, lineHeight: 1.7 }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
