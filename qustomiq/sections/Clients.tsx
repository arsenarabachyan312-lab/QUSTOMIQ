"use client";
import { useLang } from "@/lib/LangContext";

export default function Clients() {
  const { t } = useLang();
  const { label, names } = t.clients;
  const doubled = [...names, ...names];

  return (
    <section
      className="py-12 relative"
      style={{
        background: "var(--surface)",
        borderTop:  "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
      aria-label={label}
    >
      <div className="px-6 md:px-14 mb-5">
        <p style={{
          fontFamily: "var(--font-mono)", fontSize: 11.5,
          textTransform: "uppercase", letterSpacing: "0.14em",
          color: "var(--primary)",
        }}>
          {label}
        </p>
      </div>

      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 80, zIndex: 2,
          background: "linear-gradient(to right, var(--surface), transparent)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: 80, zIndex: 2,
          background: "linear-gradient(to left, var(--surface), transparent)",
          pointerEvents: "none",
        }} />

        <div className="ticker-track flex gap-12 w-max">
          {doubled.map((name, i) => (
            <span
              key={i}
              className="font-display font-semibold whitespace-nowrap shrink-0"
              style={{
                fontSize: 17,
                background: i % 2 === 0 ? "var(--gradient)" : "none",
                WebkitBackgroundClip: i % 2 === 0 ? "text" : "unset",
                WebkitTextFillColor: i % 2 === 0 ? "transparent" : "var(--muted)",
                backgroundClip: i % 2 === 0 ? "text" : "unset",
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
