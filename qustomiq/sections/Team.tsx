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
        <div className="mb-14">
          <h2
            id="team-heading"
            className="font-display font-bold text-[clamp(36px,5vw,52px)] tracking-[-1.5px] mb-3"
          >
            {tm.heading}
          </h2>
          <p className="text-[17px] text-muted leading-[1.6]">{tm.sub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px]">
          {tm.members.map((member, i) => (
            <article
              key={i}
              className="bg-white dark:bg-white/[0.04] rounded-card shadow-card border border-[var(--line)] overflow-hidden flex flex-col"
            >
              <div className="relative w-full aspect-square">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 450px"
                />
              </div>

              <div className="p-7 flex flex-col gap-4">
                <div>
                  <h3 className="font-display font-bold text-[20px] tracking-[-0.4px] mb-1">
                    {member.name}
                  </h3>
                  <span className="font-mono text-[12px] uppercase tracking-[1px] text-accent-ink dark:text-accent">
                    {member.role}
                  </span>
                </div>

                <p className="text-[14.5px] text-muted leading-[1.7]">{member.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
