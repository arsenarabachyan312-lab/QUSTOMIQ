"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -200, my = -200;
    let rx = -200, ry = -200;
    let hovered = false;
    let raf: number;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const onOver = (e: MouseEvent) => {
      const t = e.target as Element;
      hovered = !!t.closest("a, button, [role='button'], input, textarea, select, .rounded-card");
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });

    dot.style.display  = "block";
    ring.style.display = "block";

    /* Hide native cursor */
    document.documentElement.style.cursor = "none";

    const tick = () => {
      /* Dot snaps instantly */
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;

      /* Ring lags with lerp */
      rx += (mx - rx) * 0.10;
      ry += (my - ry) * 0.10;
      const scale = hovered ? 1.6 : 1;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%) scale(${scale})`;

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.style.cursor = "";
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Dot — instant */}
      <div
        ref={dotRef}
        style={{
          display: "none", position: "fixed", top: 0, left: 0,
          pointerEvents: "none", zIndex: 9999, willChange: "transform",
          width: 7, height: 7, borderRadius: "50%",
          background: "var(--primary)",
          boxShadow: "0 0 8px rgba(16,185,129,0.9)",
        }}
        aria-hidden="true"
      />
      {/* Ring — lagged */}
      <div
        ref={ringRef}
        style={{
          display: "none", position: "fixed", top: 0, left: 0,
          pointerEvents: "none", zIndex: 9998, willChange: "transform",
          width: 30, height: 30, borderRadius: "50%",
          border: "1.5px solid rgba(16,185,129,0.55)",
          transition: "transform 0.12s ease, opacity 0.2s ease, border-color 0.2s ease",
          boxShadow: "0 0 12px rgba(16,185,129,0.15)",
        }}
        aria-hidden="true"
      />
    </>
  );
}
