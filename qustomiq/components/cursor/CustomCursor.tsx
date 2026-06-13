"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const state   = useRef({ x: -100, y: -100, rx: -100, ry: -100, hovered: false });

  useEffect(() => {
    /* hide system cursor */
    document.documentElement.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      state.current.x = e.clientX;
      state.current.y = e.clientY;
    };

    const onEnter = () => { state.current.hovered = true; };
    const onLeave = () => { state.current.hovered = false; };

    const addListeners = () => {
      document.querySelectorAll<HTMLElement>("a, button, [role='button']").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    addListeners();

    const mo = new MutationObserver(addListeners);
    mo.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMove, { passive: true });

    let raf: number;
    const tick = () => {
      const s = state.current;
      s.rx += (s.x - s.rx) * 0.12;
      s.ry += (s.y - s.ry) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${s.x - 4}px, ${s.y - 4}px)`;
      }

      if (ringRef.current) {
        const size = s.hovered ? 48 : 32;
        ringRef.current.style.width  = `${size}px`;
        ringRef.current.style.height = `${size}px`;
        ringRef.current.style.transform = `translate(${s.rx - size / 2}px, ${s.ry - size / 2}px)`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      mo.disconnect();
      document.documentElement.style.cursor = "";
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed", top: 0, left: 0,
          width: 8, height: 8, borderRadius: "50%",
          background: "#F0F6FC",
          pointerEvents: "none",
          zIndex: 10001,
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed", top: 0, left: 0,
          width: 32, height: 32, borderRadius: "50%",
          border: "1.5px solid rgba(16,185,129,0.55)",
          pointerEvents: "none",
          zIndex: 10000,
          transition: "width 0.2s ease, height 0.2s ease",
        }}
      />
    </>
  );
}
