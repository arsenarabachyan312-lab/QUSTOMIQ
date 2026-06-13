"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

function smoothPath(pts: [number, number][]): string {
  if (pts.length < 2) return "";
  const parts = [`M ${pts[0][0]},${pts[0][1]}`];
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    const mx = (x0 + x1) / 2;
    parts.push(`C ${mx},${y0} ${mx},${y1} ${x1},${y1}`);
  }
  return parts.join(" ");
}

interface Props {
  data:    number[];
  labels?: string[];
  color?:  string;
  height?: number;
  vw?:     number;
}

export default function LineChart({
  data,
  labels,
  color  = "#10B981",
  height = 140,
  vw     = 480,
}: Props) {
  const reduce   = useReducedMotion();
  const padT     = 10;
  const padB     = labels ? 28 : 10;
  const chartH   = height - padT - padB;
  const chartW   = vw;
  const max      = Math.max(...data);
  const min      = Math.min(...data);
  const range    = max - min || 1;
  const gradId   = `lg-${color.replace("#", "")}`;

  const pts: [number, number][] = data.map((v, i) => [
    (i / (data.length - 1)) * chartW,
    padT + chartH - ((v - min) / range) * chartH,
  ]);

  const linePath = smoothPath(pts);
  const areaPath = `${linePath} L ${chartW},${height - padB} L 0,${height - padB} Z`;

  const GRID_LINES = 4;

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${chartW} ${height}`}
      preserveAspectRatio="none"
      style={{ display: "block", overflow: "visible" }}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0"    />
        </linearGradient>
      </defs>

      {/* Horizontal grid lines */}
      {Array.from({ length: GRID_LINES }).map((_, i) => {
        const y = padT + (chartH / GRID_LINES) * i;
        return (
          <line
            key={i}
            x1={0} y1={y} x2={chartW} y2={y}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={1}
          />
        );
      })}

      {/* Area fill */}
      <motion.path
        d={areaPath}
        fill={`url(#${gradId})`}
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
      />

      {/* Line */}
      <motion.path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: EASE_OUT }}
      />

      {/* Dots at each data point */}
      {pts.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x} cy={y} r={2.5}
          fill={color}
          initial={reduce ? false : { opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5 + i * 0.06, duration: 0.25, ease: "easeOut" }}
          style={{ transformOrigin: `${x}px ${y}px` }}
        />
      ))}

      {/* X-axis labels */}
      {labels &&
        pts.map(([x], i) => {
          if (i % 2 !== 0 && i !== data.length - 1) return null;
          return (
            <text
              key={i}
              x={x}
              y={height - 4}
              textAnchor="middle"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "8px",
                fill: "var(--text-hint)",
              }}
            >
              {labels[i]}
            </text>
          );
        })}
    </svg>
  );
}
