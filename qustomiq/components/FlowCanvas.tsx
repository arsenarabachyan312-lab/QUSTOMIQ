"use client";
import { useEffect, useRef } from "react";

function hexRgba(hex: string, a: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

const LINES = [
  { c1: "#10B981", c2: "#34F5C5", freq: 1.8, spd: 1.20, amp: 42, by: 0.10 },
  { c1: "#A78BFA", c2: "#C4B5FD", freq: 2.3, spd: 0.85, amp: 32, by: 0.26 },
  { c1: "#34F5C5", c2: "#10B981", freq: 1.5, spd: 1.50, amp: 52, by: 0.42 },
  { c1: "#A78BFA", c2: "#10B981", freq: 2.8, spd: 0.70, amp: 28, by: 0.57 },
  { c1: "#10B981", c2: "#A78BFA", freq: 1.2, spd: 1.30, amp: 46, by: 0.70 },
  { c1: "#34F5C5", c2: "#C4B5FD", freq: 2.0, spd: 1.00, amp: 38, by: 0.82 },
  { c1: "#C4B5FD", c2: "#34F5C5", freq: 1.7, spd: 0.90, amp: 35, by: 0.93 },
] as const;

export default function FlowCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.innerWidth < 640;
    const nLines   = isMobile ? 5 : LINES.length;

    let raf: number;
    let mounted = true;
    let t = 0;

    const resize = () => {
      const dpr     = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const frame = () => {
      if (!mounted || canvas.offsetWidth === 0) {
        raf = requestAnimationFrame(frame);
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const W   = canvas.width;
      const H   = canvas.height;

      ctx.clearRect(0, 0, W, H);
      t += 0.010;
      ctx.lineCap  = "round";
      ctx.lineJoin = "round";

      for (let li = 0; li < nLines; li++) {
        const ln    = LINES[li];
        const baseY = H * ln.by;
        const amp   = ln.amp * dpr;
        const phase = t * ln.spd;
        const steps = Math.ceil(W / 2);

        const buildPath = () => {
          ctx.beginPath();
          ctx.moveTo(0, baseY + amp * Math.sin(phase));
          for (let s = 1; s <= steps; s++) {
            const x = (s / steps) * W;
            const y = baseY + amp * Math.sin((s / steps) * ln.freq * Math.PI * 2 + phase);
            ctx.lineTo(x, y);
          }
        };

        const grad = ctx.createLinearGradient(0, 0, W, 0);
        grad.addColorStop(0,    hexRgba(ln.c1, 0.80));
        grad.addColorStop(0.35, hexRgba(ln.c2, 1.00));
        grad.addColorStop(0.65, hexRgba(ln.c1, 0.90));
        grad.addColorStop(1,    hexRgba(ln.c2, 0.72));

        // Pass 1: wide diffuse glow
        buildPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth   = (18 + Math.sin(t * 0.35 + li) * 5) * dpr;
        ctx.shadowBlur  = (32 + Math.sin(t * 0.28 + li * 0.55) * 10) * dpr;
        ctx.shadowColor = ln.c1;
        ctx.globalAlpha = 0.15;
        ctx.stroke();

        // Pass 2: medium glow
        buildPath();
        ctx.lineWidth   = 5 * dpr;
        ctx.shadowBlur  = 16 * dpr;
        ctx.globalAlpha = 0.48;
        ctx.stroke();

        // Pass 3: bright neon core
        buildPath();
        ctx.lineWidth   = 1.8 * dpr;
        ctx.shadowBlur  = 8 * dpr;
        ctx.globalAlpha = 0.96;
        ctx.stroke();

        ctx.globalAlpha = 1;
      }

      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => {
      mounted = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
      aria-hidden="true"
    />
  );
}
