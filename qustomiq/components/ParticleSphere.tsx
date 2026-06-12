"use client";
import { useEffect, useRef } from "react";

const N_DESKTOP = 130;
const N_MOBILE  = 60;
const AUTO_SPEED = 0.0022;
const CONNECT_DIST_SQ = 0.27;
const MAX_LINKS = 4;

type P3 = readonly [number, number, number];

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

const BASE_DESKTOP = fibonacci(N_DESKTOP);
const BASE_MOBILE  = fibonacci(N_MOBILE);
const COLORS_DESKTOP = BASE_DESKTOP.map((_, i) => (i % 3 !== 2 ? 0 : 1));
const COLORS_MOBILE  = BASE_MOBILE.map((_, i)  => (i % 3 !== 2 ? 0 : 1));

interface Props {
  className?: string;
  /** Force fewer particles (mobile background usage) */
  lite?: boolean;
}

export default function ParticleSphere({ className, lite }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ tx: 0, ty: 0 });
  const angle = useRef(0);
  const tiltX = useRef(0.18);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* Detect touch — disable mouse parallax on touch devices */
    const isTouch = navigator.maxTouchPoints > 0;

    /* Choose particle count */
    const isMobileScreen = window.innerWidth < 640;
    const N      = (lite || isMobileScreen) ? N_MOBILE  : N_DESKTOP;
    const BASE   = (lite || isMobileScreen) ? BASE_MOBILE  : BASE_DESKTOP;
    const COLORS = (lite || isMobileScreen) ? COLORS_MOBILE : COLORS_DESKTOP;

    let raf: number;

    /* HiDPI resize */
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap at 2x
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* Mouse/touch parallax — only on non-touch devices */
    const onMouseMove = (e: MouseEvent) => {
      if (isTouch) return;
      const rect = canvas.getBoundingClientRect();
      mouse.current.tx = (e.clientX - rect.left - rect.width  / 2) / rect.width;
      mouse.current.ty = (e.clientY - rect.top  - rect.height / 2) / rect.height;
    };
    if (!isTouch) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
    }

    const frame = () => {
      /* Skip drawing if canvas is hidden (display:none parent) */
      if (canvas.offsetWidth === 0 || canvas.offsetHeight === 0) {
        raf = requestAnimationFrame(frame);
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w   = canvas.width;
      const h   = canvas.height;
      const cx  = w / 2;
      const cy  = h / 2;
      const R   = Math.min(w, h) * 0.38;

      angle.current += AUTO_SPEED;
      if (!isTouch) {
        tiltX.current += (mouse.current.ty * 0.55 - tiltX.current) * 0.04;
      }
      const yOff = isTouch ? 0 : mouse.current.tx * 0.45;

      const pts: P3[] = new Array(N);
      for (let i = 0; i < N; i++) {
        let p = rotY(BASE[i], angle.current + yOff);
        p = rotX(p, tiltX.current);
        pts[i] = p;
      }

      ctx.clearRect(0, 0, w, h);

      const FOV = 2.6;
      const px2: number[] = new Array(N);
      const py2: number[] = new Array(N);
      const depth: number[] = new Array(N);
      for (let i = 0; i < N; i++) {
        const z   = pts[i][2] + FOV;
        const sc  = (R * (FOV - 0.5)) / z;
        px2[i]   = cx + pts[i][0] * sc;
        py2[i]   = cy + pts[i][1] * sc;
        depth[i] = (pts[i][2] + 1) / 2;
      }

      /* Connections */
      for (let i = 0; i < N; i++) {
        let links = 0;
        for (let j = i + 1; j < N && links < MAX_LINKS; j++) {
          const dx = pts[i][0] - pts[j][0];
          const dy = pts[i][1] - pts[j][1];
          const dz = pts[i][2] - pts[j][2];
          const d2 = dx * dx + dy * dy + dz * dz;
          if (d2 < CONNECT_DIST_SQ) {
            const avgD   = (depth[i] + depth[j]) * 0.5;
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

      /* Particles back-to-front */
      const order = Array.from({ length: N }, (_, i) => i)
        .sort((a, b) => pts[a][2] - pts[b][2]);

      for (const i of order) {
        const x = px2[i], y = py2[i];
        const d = depth[i];
        const r = (1.1 + d * 2.2) * dpr;
        const op = 0.2 + d * 0.8;
        const isEm = COLORS[i] === 0;
        const [cr, cg, cb] = isEm ? [16, 185, 129] : [167, 139, 250];

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
      if (!isTouch) window.removeEventListener("mousemove", onMouseMove);
      ro.disconnect();
    };
  }, [lite]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block" }}
      aria-hidden="true"
    />
  );
}
