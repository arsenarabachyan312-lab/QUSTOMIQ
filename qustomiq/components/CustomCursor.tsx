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

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

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
      el.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      el.style.width = hovered ? "56px" : "28px";
      el.style.height = hovered ? "56px" : "28px";
      el.style.opacity = hovered ? "0.45" : "0.28";
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
        width: "28px",
        height: "28px",
        borderRadius: "50%",
        background: "rgba(229,212,74,0.28)",
        boxShadow: "0 0 16px 8px rgba(229,212,74,0.18), 0 0 40px 18px rgba(229,212,74,0.08)",
        pointerEvents: "none",
        zIndex: 9999,
        transition: "width 0.18s ease, height 0.18s ease, opacity 0.18s ease",
        willChange: "transform",
      }}
    />
  );
}
