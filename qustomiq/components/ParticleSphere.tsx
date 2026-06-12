"use client";
import { useEffect, useRef } from "react";

const N = 130;
const AUTO_SPEED = 0.0022;
const CONNECT_DIST_SQ = 0.27;
const MAX_LINKS = 4;

type P3 = readonly [number, number, number];

/* Fibonacci sphere — evenly distributed points on unit sphere */
function fibonacci(n: number): P3[] {
  const pts: P3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = phi * i;
    pts.push([r * Math.cos(t), y, r * Math.sin(t)] as const);
  }
  return pts;
}

function rotY(p: P3, a: number): P3 {
  const c = Math.cos(a), s = Math.sin(a);
  return [p[0] * c + p[2] * s, p[1], -p[0] * s + p[2] * c];
}
function rotX(p: P3, a: number): P3 {
  const c = Math.cos(a), s = Math.sin(a);
  return [p[0], p[1] * c - p[2] * s, p[1] * s + p[2] * c];
}

const BASE = fibonacci(N);
/* Pre-assign emerald/violet per particle: 2/3 emerald, 1/3 violet */
const COLORS = BASE.map((_, i) => (i % 3 !== 2 ? 0 : 1)); // 0=emerald 1=violet

export default function ParticleSphere({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ tx: 0, ty: 0 });
  const angle = useRef(0);
  const tiltX = useRef(0.18);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;

    /* Handle HiDPI */
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* Track mouse / touch globally for parallax */
    const onMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const px = "touches" in e ? e.touches[0].clientX : e.clientX;
      const py = "touches" in e ? e.touches[0].clientY : e.clientY;
      mouse.current.tx = (px - rect.left - rect.width  / 2) / rect.width;
      mouse.current.ty = (py - rect.top  - rect.height / 2) / rect.height;
    };
    window.addEventListener("mousemove",  onMove, { passive: true });
    window.addEventListener("touchmove",  onMove, { passive: true });

    const frame = () => {
      const dpr = window.devicePixelRatio || 1;
      const w  = canvas.width;
      const h  = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const R  = Math.min(w, h) * 0.38;

      /* Advance rotation */
      angle.current += AUTO_SPEED;
      tiltX.current += (mouse.current.ty * 0.55 - tiltX.current) * 0.04;
      const yOff = mouse.current.tx * 0.45;

      /* Transform all points */
      const pts: P3[] = new Array(N);
      for (let i = 0; i < N; i++) {
        let p = rotY(BASE[i], angle.current + yOff);
        p = rotX(p, tiltX.current);
        pts[i] = p;
      }

      ctx.clearRect(0, 0, w, h);

      /* Projected 2D coords */
      const FOV = 2.6;
      const px2: number[] = new Array(N);
      const py2: number[] = new Array(N);
      const depth: number[] = new Array(N);
      for (let i = 0; i < N; i++) {
        const z   = pts[i][2] + FOV;
        const sc  = (R * (FOV - 0.5)) / z;
        px2[i]   = cx + pts[i][0] * sc;
        py2[i]   = cy + pts[i][1] * sc;
        depth[i] = (pts[i][2] + 1) / 2; // 0=back 1=front
      }

      /* Draw connections */
      for (let i = 0; i < N; i++) {
        let links = 0;
        for (let j = i + 1; j < N && links < MAX_LINKS; j++) {
          const dx = pts[i][0] - pts[j][0];
          const dy = pts[i][1] - pts[j][1];
          const dz = pts[i][2] - pts[j][2];
          const d2 = dx * dx + dy * dy + dz * dz;
          if (d2 < CONNECT_DIST_SQ) {
            const avgD = (depth[i] + depth[j]) * 0.5;
            const falloff = 1 - d2 / CONNECT_DIST_SQ;
            const opacity = avgD * 0.28 * falloff;
            ctx.strokeStyle = COLORS[i] === 0
              ? `rgba(16,185,129,${opacity})`
              : `rgba(167,139,250,${opacity})`;
            ctx.lineWidth = 0.7 * dpr;
            ctx.beginPath();
            ctx.moveTo(px2[i], py2[i]);
            ctx.lineTo(px2[j], py2[j]);
            ctx.stroke();
            links++;
          }
        }
      }

      /* Draw particles back-to-front */
      const order = Array.from({ length: N }, (_, i) => i)
        .sort((a, b) => pts[a][2] - pts[b][2]);

      for (const i of order) {
        const x = px2[i];
        const y = py2[i];
        const d = depth[i];
        const r = (1.1 + d * 2.2) * dpr;
        const op = 0.2 + d * 0.8;
        const isEm = COLORS[i] === 0;
        const [cr, cg, cb] = isEm ? [16, 185, 129] : [167, 139, 250];

        /* Glow for front-facing particles */
        if (d > 0.60) {
          const gr = r * 3.5;
          const g  = ctx.createRadialGradient(x, y, 0, x, y, gr);
          g.addColorStop(0, `rgba(${cr},${cg},${cb},${op * 0.28})`);
          g.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(x, y, gr, 0, Math.PI * 2);
          ctx.fill();
        }

        /* Core dot */
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${op})`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block" }}
      aria-hidden="true"
    />
  );
}
