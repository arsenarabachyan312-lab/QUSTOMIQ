"use client";
import Image from "next/image";
import { useLang } from "@/lib/LangContext";
import SectionBg from "@/components/SectionBg";
import { type MouseEvent } from "react";

function useTilt3D(maxDeg = 8) {
  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r  = el.getBoundingClientRect();
    const x  = (e.clientX - r.left) / r.width  - 0.5;
    const y  = (e.clientY - r.top)  / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * maxDeg}deg) rotateX(${-y * maxDeg}deg) translateZ(8px)`;
    el.style.transition = "transform 0.08s ease";
  };
  const handleLeave = (e: MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = "";
    e.currentTarget.style.transition = "transform 0.6s cubic-bezier(0.23,1,0.32,1)";
  };
  return { onMouseMove: handleMove, onMouseLeave: handleLeave };
}

export default function Team() {
  const { t } = useLang();
  const tm = t.team;
  const tilt = useTilt3D(7);

  return (
    <section id="team" className="py-20 md:py-28 px-6 md:px-14 relative" aria-labelledby="team-heading">
      <SectionBg />
      <div className="relative z-[1] max-w-[1200px] mx-auto">
        <div className="mb-14 reveal">
          <span className="section-label">Команда</span>
          <h2 id="team-heading" className="mb-3">{tm.heading}</h2>
          <p style={{ maxWidth: 480 }}>{tm.sub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[860px]">
          {tm.members.map((member, i) => {
            const accentColor = i === 0 ? "#10B981" : "#A78BFA";
            const gradBorder  = i === 0
              ? "linear-gradient(135deg, #10B981, rgba(167,139,250,0.6))"
              : "linear-gradient(135deg, #A78BFA, rgba(16,185,129,0.6))";

            return (
              <div
                key={i}
                className={`reveal reveal-delay-${i + 1}`}
                style={{
                  padding: 1, borderRadius: 22,
                  background: gradBorder,
                  boxShadow: `0 0 40px ${accentColor}20`,
                  willChange: "transform",
                }}
                {...tilt}
              >
                <article
                  style={{
                    background: "var(--surface)", borderRadius: 21,
                    overflow: "hidden", display: "flex", flexDirection: "column",
                  }}
                >
                  {/* Photo with zoom + overlay */}
                  <div className="relative w-full aspect-square overflow-hidden group">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
                      sizes="(max-width: 768px) 100vw, 430px"
                      style={{ transitionProperty: "transform" }}
                    />

                    {/* Gradient overlay */}
                    <div aria-hidden="true" style={{
                      position: "absolute", inset: 0, pointerEvents: "none",
                      background: "linear-gradient(to top, rgba(15,17,21,0.80) 0%, transparent 55%)",
                    }} />

                    {/* Role badge */}
                    <div style={{
                      position: "absolute", bottom: 16, left: 16,
                      padding: "4px 12px", borderRadius: 50,
                      background: `${accentColor}22`,
                      border: `1px solid ${accentColor}55`,
                      color: accentColor,
                      fontFamily: "var(--font-mono)", fontSize: 11,
                      letterSpacing: "0.08em", textTransform: "uppercase",
                    }}>
                      {member.role}
                    </div>

                    {/* Social icons — appear on hover */}
                    <div
                      className="absolute bottom-4 right-4 flex gap-2 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
                      aria-label="Соцсети"
                    >
                      {["Li", "TG"].map((s) => (
                        <a key={s} href="#" aria-label={s}
                          className="flex items-center justify-center rounded-full no-underline"
                          style={{
                            width: 32, height: 32,
                            background: "rgba(8,9,10,0.75)",
                            backdropFilter: "blur(8px)",
                            border: `1px solid ${accentColor}44`,
                            color: accentColor,
                            fontFamily: "var(--font-mono)", fontSize: 9,
                          }}>
                          {s}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Copy */}
                  <div style={{ padding: "24px 28px 28px" }}>
                    <h3 style={{ marginBottom: 8 }}>{member.name}</h3>
                    <p style={{ fontSize: "0.92rem", lineHeight: 1.7 }}>{member.bio}</p>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
