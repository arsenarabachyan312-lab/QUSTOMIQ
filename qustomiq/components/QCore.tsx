"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function QCore() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;

    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const S = 300;
    cv.width = S * dpr;
    cv.height = S * dpr;
    ctx.scale(dpr, dpr);

    const N = 34;
    const R = S / 2;

    const ps: Particle[] = Array.from({ length: N }, () => ({
      x: Math.random() * S,
      y: Math.random() * S,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
    }));

    function frame() {
      if (!ctx) return;
      ctx.clearRect(0, 0, S, S);

      // Radial warm golden glow
      const g = ctx.createRadialGradient(R, R, 8, R, R, R);
      g.addColorStop(0, "rgba(229,212,74,0.55)");
      g.addColorStop(0.45, "rgba(229,212,74,0.18)");
      g.addColorStop(1, "rgba(229,212,74,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(R, R, R, 0, Math.PI * 2);
      ctx.fill();

      // Move particles with circular boundary
      for (const p of ps) {
        p.x += p.vx;
        p.y += p.vy;
        const dx = p.x - R;
        const dy = p.y - R;
        if (dx * dx + dy * dy > (R - 6) * (R - 6)) {
          p.vx *= -1;
          p.vy *= -1;
          p.x += p.vx * 2;
          p.y += p.vy * 2;
        }
      }

      // Proximity links
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = ps[i];
          const b = ps[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < 56) {
            ctx.strokeStyle = `rgba(140,110,0,${(1 - d / 56) * 0.5})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Particles
      for (const p of ps) {
        ctx.fillStyle = "rgba(100,80,0,0.85)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.7, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduce) {
        rafRef.current = requestAnimationFrame(frame);
      }
    }

    frame();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 300, height: 300, display: "block" }}
      aria-hidden="true"
    />
  );
}
