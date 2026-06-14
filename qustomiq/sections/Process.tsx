"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ru } from "@/lib/i18n/ru";
import { EASE_OUT } from "@/lib/animations";

const TILT = 12;

function applyTilt(e: React.MouseEvent<HTMLElement>) {
  const el   = e.currentTarget as HTMLElement;
  const rect = el.getBoundingClientRect();
  const cx   = e.clientX - rect.left;
  const cy   = e.clientY - rect.top;
  const rotX = ((cy - rect.height / 2) / (rect.height / 2)) * -TILT;
  const rotY = ((cx - rect.width  / 2) / (rect.width  / 2)) *  TILT;
  el.style.transition = "none";
  el.style.transform  = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02,1.02,1.02)`;

  const glare = el.querySelector<HTMLElement>("[data-glare]");
  if (glare) {
    const gx = (cx / rect.width)  * 100;
    const gy = (cy / rect.height) * 100;
    glare.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.07) 0%, transparent 60%)`;
    glare.style.opacity    = "1";
  }
}

function resetTilt(e: React.MouseEvent<HTMLElement>) {
  const el    = e.currentTarget as HTMLElement;
  const glare = el.querySelector<HTMLElement>("[data-glare]");
  el.style.transition  = "transform 0.55s cubic-bezier(0.22,1,0.36,1), border-color 0.25s, box-shadow 0.25s";
  el.style.transform   = "";
  el.style.borderColor = "rgba(255,255,255,0.06)";
  el.style.boxShadow   = "none";
  if (glare) glare.style.opacity = "0";
}

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const lineRef      = useRef<HTMLDivElement>(null);
  const reduce       = useReducedMotion();

  useEffect(() => {
    if (reduce || !containerRef.current || !trackRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const track = trackRef.current!;
      const cont  = containerRef.current!;
      const totalScroll = () => track.scrollWidth - window.innerWidth + 80;

      gsap.to(track, {
        x: () => -totalScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: cont,
          start: "top top",
          end: () => `+=${totalScroll()}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      if (lineRef.current) {
        gsap.fromTo(lineRef.current, { scaleX: 0 }, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: cont,
            start: "top top",
            end: () => `+=${totalScroll()}`,
            scrub: 1.2,
          },
        });
      }

      /* Called when breakpoint deactivates (e.g. resize to mobile) */
      return () => { gsap.set(track, { x: 0 }); };
    });

    /* Mobile branch — explicitly clear any transform left by a prior desktop run */
    mm.add("(max-width: 767px)", () => {
      if (trackRef.current) gsap.set(trackRef.current, { x: 0 });
    });

    return () => mm.revert();
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

          {/* Progress line — hidden on mobile (no ScrollTrigger on mobile) */}
          <div
            className="process-progress-line"
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
                position:       "absolute",
                inset:          0,
                background:     "var(--emerald)",
                transformOrigin:"left",
                transform:      "scaleX(0)",
                boxShadow:      "0 0 8px rgba(16,185,129,0.6)",
              }}
            />
          </div>
        </div>

        {/* Horizontal step track — vertical stack on mobile via CSS */}
        <div
          ref={trackRef}
          className="process-track"
          style={{
            display:      "flex",
            gap:          "1.5rem",
            paddingInline:"var(--section-px)",
            paddingBottom:"var(--section-py)",
            width:        "max-content",
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
                flexShrink:   0,
                width:        "clamp(280px, 28vw, 360px)",
                background:   "var(--obsidian)",
                border:       "1px solid rgba(255,255,255,0.06)",
                borderRadius: 20,
                padding:      "36px 32px",
                position:     "relative",
                overflow:     "hidden",
                willChange:   "transform",
                transition:   "transform 0.55s cubic-bezier(0.22,1,0.36,1), border-color 0.25s, box-shadow 0.25s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(16,185,129,0.25)";
                el.style.boxShadow   = "0 0 48px rgba(16,185,129,0.06)";
              }}
              onMouseMove={reduce ? undefined : applyTilt}
              onMouseLeave={reduce ? undefined : resetTilt}
            >
              {/* Glare overlay */}
              <div
                data-glare=""
                aria-hidden="true"
                style={{
                  position:      "absolute",
                  inset:         0,
                  borderRadius:  "inherit",
                  pointerEvents: "none",
                  opacity:       0,
                  zIndex:        2,
                  transition:    "opacity 0.2s",
                }}
              />

              {/* Mobile step counter — hidden on desktop via CSS */}
              <span
                className="process-step-indicator"
                style={{
                  fontFamily:    "var(--font-mono)",
                  fontSize:      11,
                  color:         "var(--emerald)",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  marginBottom:  12,
                  position:      "relative",
                  zIndex:        3,
                }}
              >
                {`Шаг ${i + 1} из ${steps.length}`}
              </span>

              {/* Watermark step number */}
              <div
                aria-hidden="true"
                style={{
                  position:      "absolute",
                  top:           -10, right: 16,
                  fontFamily:    "var(--font-mono)",
                  fontWeight:    700,
                  fontSize:      96,
                  color:         "rgba(16,185,129,0.06)",
                  lineHeight:    1,
                  userSelect:    "none",
                  letterSpacing: "-0.05em",
                }}
              >
                {step.n}
              </div>

              <span className="eyebrow" style={{ marginBottom: 16, position: "relative", zIndex: 3 }}>
                {step.label}
              </span>
              <h3
                style={{
                  fontFamily:    "var(--font-display)",
                  fontSize:      "1.4rem",
                  marginBottom:  14,
                  lineHeight:    1.2,
                  letterSpacing: "-0.02em",
                  color:         "var(--text-primary)",
                  position:      "relative",
                  zIndex:        3,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  color:      "var(--text-muted)",
                  fontSize:   15,
                  lineHeight: 1.75,
                  position:   "relative",
                  zIndex:     3,
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
