"use client";

import { useMemo } from "react";

function buildGrid(): string {
  const c = "#F8A91F";
  const fo = "0.06";   // fill-opacity for dots
  const so = "0.035";  // stroke-opacity for lines
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60'>` +
    `<circle cx='0'  cy='0'  r='1.3' fill='${c}' fill-opacity='${fo}'/>` +
    `<circle cx='30' cy='0'  r='0.8' fill='${c}' fill-opacity='${fo}'/>` +
    `<circle cx='60' cy='0'  r='1.3' fill='${c}' fill-opacity='${fo}'/>` +
    `<circle cx='60' cy='30' r='0.8' fill='${c}' fill-opacity='${fo}'/>` +
    `<circle cx='60' cy='60' r='1.3' fill='${c}' fill-opacity='${fo}'/>` +
    `<circle cx='30' cy='60' r='0.8' fill='${c}' fill-opacity='${fo}'/>` +
    `<circle cx='0'  cy='60' r='1.3' fill='${c}' fill-opacity='${fo}'/>` +
    `<circle cx='0'  cy='30' r='0.8' fill='${c}' fill-opacity='${fo}'/>` +
    `<circle cx='30' cy='30' r='1.1' fill='${c}' fill-opacity='${fo}'/>` +
    // cardinal lines (center → edge midpoints)
    `<line x1='30' y1='30' x2='30' y2='0'  stroke='${c}' stroke-opacity='${so}' stroke-width='0.5'/>` +
    `<line x1='30' y1='30' x2='60' y2='30' stroke='${c}' stroke-opacity='${so}' stroke-width='0.5'/>` +
    `<line x1='30' y1='30' x2='30' y2='60' stroke='${c}' stroke-opacity='${so}' stroke-width='0.5'/>` +
    `<line x1='30' y1='30' x2='0'  y2='30' stroke='${c}' stroke-opacity='${so}' stroke-width='0.5'/>` +
    // diagonal lines (center → corners, thinner)
    `<line x1='30' y1='30' x2='0'  y2='0'  stroke='${c}' stroke-opacity='${so}' stroke-width='0.3'/>` +
    `<line x1='30' y1='30' x2='60' y2='0'  stroke='${c}' stroke-opacity='${so}' stroke-width='0.3'/>` +
    `<line x1='30' y1='30' x2='60' y2='60' stroke='${c}' stroke-opacity='${so}' stroke-width='0.3'/>` +
    `<line x1='30' y1='30' x2='0'  y2='60' stroke='${c}' stroke-opacity='${so}' stroke-width='0.3'/>` +
    `</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

export default function SectionBg() {
  const gridBg = useMemo(() => buildGrid(), []);

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Dot-grid + glow blobs in a single layer */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            gridBg,
            // top-right accent glow — larger, more saturated
            "radial-gradient(ellipse 90% 80% at 92% 0%, rgba(248,169,31,0.18) 0%, rgba(236,100,38,0.06) 40%, transparent 70%)",
            // bottom-left soft glow
            "radial-gradient(ellipse 75% 70% at 4% 98%, rgba(236,100,38,0.12) 0%, rgba(248,169,31,0.04) 45%, transparent 68%)",
            // centre-right secondary depth
            "radial-gradient(ellipse 50% 45% at 75% 55%, rgba(248,169,31,0.05) 0%, transparent 60%)",
          ].join(", "),
          backgroundRepeat: "repeat, no-repeat, no-repeat, no-repeat",
          backgroundSize: "60px 60px, 100% 100%, 100% 100%, 100% 100%",
        }}
      />
    </div>
  );
}
