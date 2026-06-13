"use client";
import { useEffect, useRef } from "react";

const NPOINTS = 36;
const NTURNS  = 3.5;
const CYCLE   = 18;

const CA = "#10B981";
const CB = "#A78BFA";
const CC = "#34F5C5";

function rgba(hex: string, a: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

export default function DNAHelix({ className }: { className?: string }) {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mxRef     = useRef(0);
  const myRef     = useRef(0);

  useEffect(() => {
    const wrap   = wrapRef.current!;
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;

    let raf       = 0;
    let startTime = 0;
    let running   = false;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const w = wrap.offsetWidth;
      const h = wrap.offsetHeight;
      if (!w || !h) return;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width  = w + "px";
      canvas.style.height = h + "px";
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      mxRef.current = ((e.clientX - r.left) / r.width  - 0.5) * 2;
      myRef.current = ((e.clientY - r.top)  / r.height - 0.5) * 2;
    };
    const onLeave = () => { mxRef.current = 0; myRef.current = 0; };
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);

    function frame(ts: number) {
      if (!running) return;
      if (!startTime) startTime = ts;
      const t = (ts - startTime) / 1000;

      const W = wrap.offsetWidth;
      const H = wrap.offsetHeight;
      if (!W || !H) { raf = requestAnimationFrame(frame); return; }

      ctx.clearRect(0, 0, W, H);

      /* parallax tilt */
      const tx = mxRef.current * 8;
      const ty = myRef.current * 5;
      wrap.style.transform = `perspective(700px) rotateY(${tx}deg) rotateX(${-ty}deg)`;

      const cx     = W / 2;
      const radius = Math.min(W * 0.30, 88);
      const stepY  = H / (NPOINTS - 1);
      const rot    = (t / CYCLE) * Math.PI * 2;

      type Pt = { x: number; y: number; z: number; depth: number; strand: "A" | "B"; idx: number };
      const pts: Pt[] = [];

      for (let i = 0; i < NPOINTS; i++) {
        const base  = (i / (NPOINTS - 1)) * NTURNS * Math.PI * 2;
        const angle = base + rot;

        const zA = Math.sin(angle);
        pts.push({ x: cx + radius * Math.cos(angle), y: i * stepY, z: zA, depth: (zA + 1) / 2, strand: "A", idx: i });

        const zB = Math.sin(angle + Math.PI);
        pts.push({ x: cx + radius * Math.cos(angle + Math.PI), y: i * stepY, z: zB, depth: (zB + 1) / 2, strand: "B", idx: i });
      }

      pts.sort((a, b) => a.z - b.z);

      /* base pairs */
      for (let i = 0; i < NPOINTS; i += 3) {
        const pA = pts.find(p => p.strand === "A" && p.idx === i);
        const pB = pts.find(p => p.strand === "B" && p.idx === i);
        if (!pA || !pB) continue;
        const avgDepth = (pA.depth + pB.depth) / 2;
        const alpha    = 0.1 + avgDepth * 0.25;
        const grad = ctx.createLinearGradient(pA.x, pA.y, pB.x, pB.y);
        grad.addColorStop(0, rgba(CA, alpha));
        grad.addColorStop(1, rgba(CB, alpha));
        ctx.beginPath();
        ctx.moveTo(pA.x, pA.y);
        ctx.lineTo(pB.x, pB.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth   = 0.8;
        ctx.stroke();
      }

      /* backbone strands */
      for (const strand of ["A", "B"] as const) {
        const sp    = pts.filter(p => p.strand === strand).sort((a, b) => a.idx - b.idx);
        const color = strand === "A" ? CA : CB;

        ctx.beginPath();
        sp.forEach((p, j) => (j === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
        ctx.strokeStyle  = rgba(color, 0.08);
        ctx.lineWidth    = 7;
        ctx.shadowColor  = rgba(color, 0.4);
        ctx.shadowBlur   = 12;
        ctx.stroke();

        ctx.beginPath();
        sp.forEach((p, j) => (j === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
        ctx.strokeStyle = rgba(color, 0.45);
        ctx.lineWidth   = 1.2;
        ctx.shadowBlur  = 0;
        ctx.stroke();
      }
      ctx.shadowBlur = 0;

      /* nodes */
      for (const p of pts) {
        const hot   = p.depth > 0.80;
        const color = hot ? CC : (p.strand === "A" ? CA : CB);
        const alpha = 0.3 + p.depth * 0.7;
        const r     = (hot ? 4.5 : 3) * (0.55 + p.depth * 0.45);

        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = rgba(color, alpha * 0.14);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = rgba(color, alpha);
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          running = true;
          startTime = 0;
          raf = requestAnimationFrame(frame);
        } else {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.05 }
    );
    io.observe(wrap);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ transformOrigin: "50% 50%", willChange: "transform" }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
        aria-hidden="true"
      />
    </div>
  );
}
