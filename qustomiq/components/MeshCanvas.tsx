"use client";
import { useEffect, useRef } from "react";

const COLS = 13;
const ROWS = 9;

export default function MeshCanvas({ className }: { className?: string }) {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mxRef     = useRef(0);

  useEffect(() => {
    const wrap   = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = navigator.maxTouchPoints > 0 || window.innerWidth < 640;
    const cols     = isMobile ? 8 : COLS;
    const rows     = isMobile ? 6 : ROWS;

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

    const onMove = (e: MouseEvent) => {
      mxRef.current = (e.clientX / window.innerWidth - 0.5) * 2;
    };
    if (!isMobile) window.addEventListener("mousemove", onMove, { passive: true });

    const frame = () => {
      if (!mounted || canvas.offsetWidth === 0) {
        raf = requestAnimationFrame(frame);
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const W   = canvas.width;
      const H   = canvas.height;

      ctx.clearRect(0, 0, W, H);
      t += 0.015;

      // Mouse-reactive Y rotation
      wrap.style.transform =
        `perspective(650px) rotateX(-22deg) rotateY(${mxRef.current * 6}deg)`;

      const padX  = W * 0.06;
      const padY  = H * 0.05;
      const stepX = (W - padX * 2) / (cols - 1);
      const stepY = (H - padY * 2) / (rows - 1);
      const AMP   = 22 * dpr;

      // Node positions with sine wave in Y
      const pts: { x: number; y: number; wave: number }[][] = [];
      for (let r = 0; r < rows; r++) {
        pts[r] = [];
        for (let c = 0; c < cols; c++) {
          const bx    = padX + c * stepX;
          const by    = padY + r * stepY;
          const cN    = c / (cols - 1);
          const rN    = r / (rows - 1);
          const phase = cN * Math.PI * 5.5 - t * 2.2;
          const raw   = Math.sin(phase);
          const amp   = AMP * (0.65 + rN * 0.65);
          pts[r][c]   = { x: bx, y: by - raw * amp, wave: (raw + 1) / 2 };
        }
      }

      // Horizontal lines — emerald / mint peak
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols - 1; c++) {
          const a   = pts[r][c];
          const b   = pts[r][c + 1];
          const wv  = (a.wave + b.wave) / 2;
          const hot = wv > 0.70;
          const clr = hot ? "#34F5C5" : "#10B981";

          // Outer glow
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = hot ? "rgba(52,245,197,0.20)" : "rgba(16,185,129,0.16)";
          ctx.lineWidth   = (10 + wv * 8) * dpr;
          ctx.shadowBlur  = (24 + wv * 20) * dpr;
          ctx.shadowColor = clr;
          ctx.stroke();

          // Bright core
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = hot
            ? `rgba(52,245,197,${(0.88 + wv * 0.12).toFixed(2)})`
            : `rgba(16,185,129,${(0.80 + wv * 0.15).toFixed(2)})`;
          ctx.lineWidth   = (1.4 + wv * 1.2) * dpr;
          ctx.shadowBlur  = (8 + wv * 14) * dpr;
          ctx.stroke();
        }
      }

      // Vertical lines — violet
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows - 1; r++) {
          const a  = pts[r][c];
          const b  = pts[r + 1][c];
          const wv = (a.wave + b.wave) / 2;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(167,139,250,${(0.38 + wv * 0.42).toFixed(2)})`;
          ctx.lineWidth   = (0.9 + wv * 0.7) * dpr;
          ctx.shadowBlur  = (5 + wv * 10) * dpr;
          ctx.shadowColor = "#A78BFA";
          ctx.stroke();
        }
      }

      // Glowing nodes
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p   = pts[r][c];
          const hot = p.wave > 0.72;
          const clr = hot ? "#34F5C5" : "#10B981";
          const rad = (hot ? 4.5 + p.wave * 2.5 : 2.5 + p.wave * 1.5) * dpr;

          // Soft radial halo
          const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad * 5);
          grd.addColorStop(0, hot ? "rgba(52,245,197,0.28)" : "rgba(16,185,129,0.16)");
          grd.addColorStop(1, "rgba(0,0,0,0)");
          ctx.beginPath();
          ctx.arc(p.x, p.y, rad * 5, 0, Math.PI * 2);
          ctx.fillStyle  = grd;
          ctx.shadowBlur = 0;
          ctx.fill();

          // Bright dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
          ctx.fillStyle   = clr;
          ctx.shadowBlur  = (hot ? 24 : 10) * dpr;
          ctx.shadowColor = clr;
          ctx.fill();
        }
      }

      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => {
      mounted = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      if (!isMobile) window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{
        transform: "perspective(650px) rotateX(-22deg)",
        transformOrigin: "50% 90%",
        willChange: "transform",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
        aria-hidden="true"
      />
    </div>
  );
}
