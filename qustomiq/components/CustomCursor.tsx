"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const el = ref.current;
    if (!el) return;

    let mx = -200, my = -200;
    let cx = -200, cy = -200;
    let hovered = false;
    let raf: number;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const onOver = (e: MouseEvent) => {
      const t = e.target as Element;
      hovered = !!t.closest("a, button, [role='button'], input, textarea, select, label");
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    el.style.display = "block";

    const tick = () => {
      cx += (mx - cx) * 0.1;
      cy += (my - cy) * 0.1;
      const scale = hovered ? 1.4 : 1;
      el.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%) scale(${scale})`;
      el.style.opacity = hovered ? "1" : "0.8";
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        display: "none",
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
        transition: "opacity 0.18s ease",
        willChange: "transform",
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 28 28"
        fill="none"
        style={{ filter: "drop-shadow(0 0 6px rgba(240,165,0,0.8))" }}
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" stroke="#F0A500" strokeWidth="3.5" />
        <line x1="15" y1="15" x2="20" y2="20" stroke="#F0A500" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}
