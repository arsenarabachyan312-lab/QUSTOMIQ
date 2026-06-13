"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

interface Props {
  data:    number[];
  labels:  string[];
  vw?:     number;
  height?: number;
}

const COLORS = ["#10B981", "#A78BFA", "#34F5C5", "#10B981", "#A78BFA", "#34F5C5"];

export default function BarChart({ data, labels, vw = 280, height = 140 }: Props) {
  const reduce  = useReducedMotion();
  const padB    = 24;
  const padTop  = 10;
  const chartH  = height - padB - padTop;
  const max     = Math.max(...data);
  const count   = data.length;
  const gap     = 8;
  const barW    = (vw - gap * (count + 1)) / count;

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${vw} ${height}`}
      preserveAspectRatio="xMidYMax meet"
      style={{ display: "block", overflow: "visible" }}
    >
      {/* Horizontal grid lines */}
      {[0.25, 0.5, 0.75, 1].map((frac) => {
        const y = padTop + chartH - frac * chartH;
        return (
          <line
            key={frac}
            x1={0} y1={y} x2={vw} y2={y}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={1}
          />
        );
      })}

      {data.map((v, i) => {
        const barH = (v / max) * chartH;
        const x    = gap + i * (barW + gap);
        const y    = padTop + chartH - barH;
        const c    = COLORS[i % COLORS.length];

        return (
          <g key={i}>
            {/* Bar */}
            <motion.rect
              x={x}
              width={barW}
              rx={3}
              fill={c}
              opacity={0.85}
              initial={reduce ? false : { height: 0, y: padTop + chartH }}
              whileInView={{ height: barH, y }}
              viewport={{ once: true }}
              transition={{
                duration: 0.75,
                ease: EASE_OUT,
                delay: 0.2 + i * 0.07,
              }}
            />
            {/* Value label */}
            <motion.text
              x={x + barW / 2}
              y={y - 4}
              textAnchor="middle"
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + i * 0.07, duration: 0.3 }}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "8px",
                fill: c,
              }}
            >
              {v}%
            </motion.text>
            {/* X label */}
            <text
              x={x + barW / 2}
              y={height - 5}
              textAnchor="middle"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "8px",
                fill: "var(--text-hint)",
              }}
            >
              {labels[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
