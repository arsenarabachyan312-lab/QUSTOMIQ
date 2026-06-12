"use client";
import Image from "next/image";
import { useLang } from "@/lib/LangContext";
import SectionBg from "@/components/SectionBg";

export default function Team() {
  const { t } = useLang();
  const tm = t.team;

  return (
    <section
      id="team"
      className="py-20 md:py-28 px-6 md:px-14 relative"
      aria-labelledby="team-heading"
    >
      <SectionBg />
      <div className="relative z-[1] max-w-[1200px] mx-auto">
        <div className="mb-14 reveal">
          <span className="section-label">Команда</span>
          <h2 id="team-heading" className="mb-3">{tm.heading}</h2>
          <p style={{ maxWidth: 480 }}>{tm.sub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[860px]">
          {tm.members.map((member, i) => (
            /* Gradient border wrapper */
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1}`}
              style={{
                padding: 1,
                borderRadius: 22,
                background: i === 0
                  ? "linear-gradient(135deg, #10B981, rgba(167,139,250,0.6))"
                  : "linear-gradient(135deg, #A78BFA, rgba(16,185,129,0.6))",
                boxShadow: i === 0
                  ? "0 0 40px rgba(16,185,129,0.15)"
                  : "0 0 40px rgba(167,139,250,0.15)",
              }}
            >
              <article
                style={{
                  background: "var(--surface)",
                  borderRadius: 21,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Photo */}
                <div className="relative w-full aspect-square">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 430px"
                  />
                  {/* Gradient overlay */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute", inset: 0, pointerEvents: "none",
                      background: i === 0
                        ? "linear-gradient(to top, rgba(15,17,21,0.75) 0%, transparent 55%)"
                        : "linear-gradient(to top, rgba(15,17,21,0.75) 0%, transparent 55%)",
                    }}
                  />
                  {/* Role badge bottom-left */}
                  <div
                    style={{
                      position: "absolute", bottom: 16, left: 16,
                      padding: "4px 12px", borderRadius: 50,
                      background: i === 0 ? "rgba(16,185,129,0.20)" : "rgba(167,139,250,0.20)",
                      border: `1px solid ${i === 0 ? "rgba(16,185,129,0.40)" : "rgba(167,139,250,0.40)"}`,
                      color: i === 0 ? "var(--primary)" : "var(--secondary)",
                      fontFamily: "var(--font-mono)", fontSize: 11,
                      letterSpacing: "0.08em", textTransform: "uppercase",
                    }}
                  >
                    {member.role}
                  </div>
                </div>

                {/* Copy */}
                <div style={{ padding: "24px 28px 28px" }}>
                  <h3 style={{ marginBottom: 8 }}>{member.name}</h3>
                  <p style={{ fontSize: "0.92rem", lineHeight: 1.7 }}>{member.bio}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
