"use client";
import { useEffect } from "react";
import Nav from "@/components/Nav";
import ParticleSphere from "@/components/ParticleSphere";

export default function Hero() {
  /* Global scroll-reveal observer — watches all .reveal on the page */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* ── Background layers ── */}
      <div className="bg-blobs" aria-hidden="true">
        <div className="blob blob-emerald" />
        <div className="blob blob-violet" />
        <div className="blob blob-emerald-2" />
      </div>
      <div className="dot-grid" aria-hidden="true" />

      {/* ── Navbar ── */}
      <Nav />

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex items-center w-full max-w-[1380px] mx-auto px-6 md:px-12 lg:px-20 pt-6 pb-16">

        {/* Left: copy */}
        <div className="flex-1 max-w-[640px] reveal">
          {/* Badge */}
          <div className="badge mb-8">
            <span className="badge-dot" />
            IT-компания нового поколения
          </div>

          {/* Heading */}
          <h1 className="mb-6">
            Автоматизация<br />
            бизнеса с помощью{" "}
            <span className="gradient-text">AI</span>
          </h1>

          {/* Sub */}
          <p
            className="lead mb-10 max-w-[520px]"
            style={{ color: "var(--muted)" }}
          >
            Строим кастомные AI-системы, CRM и аналитику для FMCG,
            ритейла и производства — от прототипа до промышленной эксплуатации.
          </p>

          {/* CTAs */}
          <div className="flex gap-4 flex-wrap">
            <a href="#contacts" className="btn-primary">
              Обсудить проект
              <svg
                width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a href="#cases" className="btn-ghost">
              Смотреть кейсы
            </a>
          </div>

          {/* Stats row */}
          <div className="flex gap-10 mt-14 flex-wrap">
            {[
              { v: "50+",   l: "проектов" },
              { v: "5 лет", l: "на рынке" },
              { v: "98%",   l: "SLA" },
            ].map(({ v, l }) => (
              <div key={l}>
                <div
                  className="font-display font-bold"
                  style={{
                    fontSize: "clamp(1.6rem,3vw,2.1rem)",
                    background: "var(--gradient)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    lineHeight: 1.1,
                  }}
                >
                  {v}
                </div>
                <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: particle sphere */}
        <div
          className="hidden lg:flex flex-1 items-center justify-center"
          aria-hidden="true"
        >
          <ParticleSphere className="w-[580px] h-[580px]" />
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="relative z-10 flex justify-center pb-8" aria-hidden="true">
        <div
          style={{
            width: 24, height: 40,
            borderRadius: 12,
            border: "1.5px solid rgba(255,255,255,0.14)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: 6,
          }}
        >
          <div
            style={{
              width: 4, height: 8,
              borderRadius: 2,
              background: "var(--primary)",
              animation: "scrollDot 2.2s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}
