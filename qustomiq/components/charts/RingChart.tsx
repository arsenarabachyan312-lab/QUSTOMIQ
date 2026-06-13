"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

interface Props {
  value:   number;   /* 0–100 */
  label:   string;
  color?:  string;
  size?:   number;
}

export default function RingChart({ value, label, color = "#10B981", size = 80 }: Props) {
  const reduce = useReducedMotion();
  const r      = (size - 12) / 2;
  const c      = size / 2;
  const circ   = 2 * Math.PI * r;
  const dash   = (value / 100) * circ;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ display: "block" }}
      >
        {/* Track */}
        <circle
          cx={c} cy={c} r={r}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={6}
        />
        {/* Progress */}
        <motion.circle
          cx={c} cy={c} r={r}
          fill="none"
          stroke={color}
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray={circ}
          transform={`rotate(-90 ${c} ${c})`}
          initial={reduce ? false : { strokeDashoffset: circ }}
          whileInView={{ strokeDashoffset: circ - dash }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: EASE_OUT, delay: 0.2 }}
        />
        {/* Center value */}
        <text
          x={c} y={c + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: size * 0.2,
            fill: "var(--text-primary)",
          }}
        >
          {value}
        </text>
      </svg>
      <span
        style={{
          fontFamily:    "var(--font-mono)",
          fontSize:      10,
          color:         "var(--text-hint)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          textAlign:     "center",
          whiteSpace:    "pre-line",
          lineHeight:    1.4,
        }}
      >
        {label}
      </span>
    </div>
  );
}
