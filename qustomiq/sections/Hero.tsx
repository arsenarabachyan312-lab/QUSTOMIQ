"use client";
import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import ParticleSphere from "@/components/ParticleSphere";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: EASE, delay },
});

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col"
      style={{ background: "var(--bg)", overflow: "hidden" }}
    >
      {/* ── Backgrounds ── */}
      <div className="bg-blobs" aria-hidden="true">
        <div className="blob blob-emerald" />
        <div className="blob blob-violet" />
        <div className="blob blob-emerald-2" />
      </div>
      <div className="dot-grid" aria-hidden="true" />

      {/* ── Navbar ── */}
      <Nav />

      {/* ── Main content ── */}
      <div
        className="relative z-10 flex-1 flex flex-col lg:flex-row items-center w-full mx-auto"
        style={{
          maxWidth: 1320,
          paddingLeft:  "clamp(1rem, 5vw, 3.5rem)",
          paddingRight: "clamp(1rem, 5vw, 3.5rem)",
          paddingTop:   "clamp(2rem, 5vw, 4rem)",
          paddingBottom: "clamp(2.5rem, 5vw, 5rem)",
          gap: "clamp(2rem, 5vw, 0rem)",
        }}
      >
        {/* Mobile sphere — absolute background behind text */}
        <div
          className="sm:hidden absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
          style={{ opacity: 0.35, zIndex: 0 }}
        >
          <ParticleSphere className="w-[300px] h-[300px]" lite />
        </div>

        {/* Left: copy */}
        <div className="relative z-10 flex-shrink-0 w-full lg:max-w-[600px]">
          {/* Badge */}
          <motion.div {...fadeUp(0)} className="badge mb-6 sm:mb-8" style={{ fontSize: "clamp(11px, 2.5vw, 13px)" }}>
            <span className="badge-dot" />
            SFA · DMS · AI · Интеграции
          </motion.div>

          {/* Heading */}
          <motion.h1 {...fadeUp(0.1)} className="mb-5 sm:mb-6">
            Автоматизация<br />
            бизнеса с помощью{" "}
            <span className="gradient-text">AI</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            {...fadeUp(0.2)}
            className="lead mb-8 sm:mb-10"
            style={{ color: "var(--muted)", maxWidth: 520 }}
          >
            Строим кастомные AI-системы, CRM и аналитику для FMCG,
            ритейла и производства — от прототипа до промышленной эксплуатации.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.3)} className="hero-ctas flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a href="#contacts" className="btn-primary">
              Обсудить проект
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a href="#cases" className="btn-ghost">
              Смотреть кейсы
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            {...fadeUp(0.4)}
            className="flex flex-wrap mt-10 sm:mt-14"
            style={{ gap: "clamp(1.5rem, 5vw, 2.5rem)" }}
          >
            {[
              { v: "50+",     l: "проектов" },
              { v: "6 нед.",  l: "до MVP" },
              { v: "98%",     l: "SLA" },
            ].map(({ v, l }) => (
              <div key={l}>
                <div
                  className="font-display font-bold"
                  style={{
                    fontSize: "clamp(1.5rem, 3.5vw, 2.1rem)",
                    background: "var(--gradient)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    lineHeight: 1.1,
                  }}
                >
                  {v}
                </div>
                <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", color: "var(--muted)", marginTop: 4 }}>
                  {l}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Tablet sphere — in flow below text, centered */}
        <div
          className="hidden sm:flex lg:hidden justify-center items-center w-full flex-shrink-0"
          aria-hidden="true"
        >
          <ParticleSphere className="w-[380px] h-[380px] sm:w-[420px] sm:h-[420px]" />
        </div>

        {/* Desktop sphere — right column */}
        <div
          className="hidden lg:flex flex-1 items-center justify-center flex-shrink-0"
          aria-hidden="true"
          style={{ minWidth: 0 }}
        >
          <ParticleSphere className="w-[540px] h-[540px] xl:w-[600px] xl:h-[600px]" />
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="relative z-10 flex justify-center pb-6 sm:pb-8"
        aria-hidden="true"
      >
        <div style={{
          width: 24, height: 40, borderRadius: 12,
          border: "1.5px solid rgba(255,255,255,0.14)",
          display: "flex", alignItems: "flex-start",
          justifyContent: "center", paddingTop: 6,
        }}>
          <div style={{
            width: 4, height: 8, borderRadius: 2,
            background: "var(--primary)",
            animation: "scrollDot 2.2s ease-in-out infinite",
          }} />
        </div>
      </motion.div>
    </section>
  );
}
