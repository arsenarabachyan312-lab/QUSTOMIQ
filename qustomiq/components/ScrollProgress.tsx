"use client";
import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const onScroll = () => {
      const scrollTop  = window.scrollY;
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
      bar.style.width = `${pct}%`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed", top: 0, left: 0, right: 0,
        height: 3, zIndex: 9997, pointerEvents: "none",
        background: "rgba(255,255,255,0.04)",
      }}
      aria-hidden="true"
    >
      <div
        ref={barRef}
        style={{
          height: "100%", width: "0%",
          background: "linear-gradient(90deg, #10B981 0%, #A78BFA 100%)",
          transition: "width 0.08s linear",
          willChange: "width",
          boxShadow: "0 0 8px rgba(16,185,129,0.6)",
        }}
      />
    </div>
  );
}
