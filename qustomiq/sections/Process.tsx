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
      style={{ background: "var(--surface)", overflow: "hidden" }}
    >
      <div ref={containerRef}>
        <div className="q-container" style={{ paddingTop: "var(--section-py)", paddingBottom: "3rem" }}>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: EASE_OUT }}
          >
            <span className="eyebrow" style={{ marginBottom: 16 }}>{eyebrow}</span>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>{heading}</h2>
          </motion.div>

          {/* Progress line */}
          <div
            style={{
              marginTop: 40,
              height: 2,
              background: "rgba(255,255,255,0.06)",
              position: "relative",
              overflow: "hidden",
              borderRadius: 1,
            }}
          >
            <div
              ref={lineRef}
              style={{
                position: "absolute",
                inset: 0,
                background: "var(--emerald)",
                transformOrigin: "left",
                transform: "scaleX(0)",
                boxShadow: "0 0 8px rgba(16,185,129,0.6)",
              }}
            />
          </div>
        </div>

        {/* Horizontal step track */}
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
                background: "var(--obsidian)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 20,
                padding: "36px 32px",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(16,185,129,0.25)";
                el.style.boxShadow   = "0 0 48px rgba(16,185,129,0.06)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,0.06)";
                el.style.boxShadow   = "none";
              }}
            >
              {/* Watermark step number */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: -10, right: 16,
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  fontSize: 96,
                  color: "rgba(16,185,129,0.06)",
                  lineHeight: 1,
                  userSelect: "none",
                  letterSpacing: "-0.05em",
                }}
              >
                {step.n}
              </div>

              <span className="eyebrow" style={{ marginBottom: 16 }}>{step.label}</span>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.4rem",
                  marginBottom: 14,
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  color: "var(--text-primary)",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: 15,
                  lineHeight: 1.75,
                }}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
