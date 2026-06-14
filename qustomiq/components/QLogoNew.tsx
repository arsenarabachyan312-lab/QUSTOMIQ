"use client";
import { useId } from "react";

interface Props {
  size?: number;
  wordmark?: boolean;
}

export default function QLogoNew({ size = 34, wordmark = true }: Props) {
  const uid = useId().replace(/:/g, "");
  const gid = `qgrad-${uid}`;
  const fid = `qfilt-${uid}`;

  return (
    <div className="q-logo-new">
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#10B981" />
            <stop offset="100%" stopColor="#A78BFA" />
          </linearGradient>
          <filter id={fid} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Q circle: 275° arc, gap at bottom-right, center (20,20) r=12 */}
        <path
          d="M 30 14 A 12 12 0 1 0 26 30"
          stroke={`url(#${gid})`}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          filter={`url(#${fid})`}
        />

        {/* Q tail — diagonal from gap, going SE */}
        <line
          x1="25" y1="28"
          x2="33" y2="36"
          stroke={`url(#${gid})`}
          strokeWidth="3"
          strokeLinecap="round"
          filter={`url(#${fid})`}
        />
      </svg>

      {wordmark && (
        <span
          className="q-wordmark"
          style={{
            fontSize:      size * 0.53,
            fontFamily:    "var(--font-display)",
            fontWeight:    700,
            letterSpacing: "-0.02em",
          }}
        >
          <span>QUSTOM</span><span style={{ color: "#10B981" }}>IQ</span>
        </span>
      )}
    </div>
  );
}
