export default function QCore() {
  return (
    <svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      style={{ display: "block" }}
      aria-hidden="true"
    >
      <defs>
        {/* Portal depth: black void center → ember glow at rim */}
        <radialGradient id="qPortalDepth" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#000000"/>
          <stop offset="20%"  stopColor="#080200"/>
          <stop offset="42%"  stopColor="#1a0800"/>
          <stop offset="66%"  stopColor="#3D1500"/>
          <stop offset="83%"  stopColor="#8B3500"/>
          <stop offset="100%" stopColor="#C05A15"/>
        </radialGradient>

        {/* Faint vanishing light at center */}
        <radialGradient id="qVanishGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#FFF3B0" stopOpacity="0.22"/>
          <stop offset="45%"  stopColor="#F5A623" stopOpacity="0.07"/>
          <stop offset="100%" stopColor="#000000" stopOpacity="0"/>
        </radialGradient>

        {/* Tunnel ring bloom */}
        <filter id="qRingGlow" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.7" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Engineer + beam glow */}
        <filter id="qEngGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Portal background */}
      <circle cx="50" cy="50" r="48" fill="url(#qPortalDepth)"/>

      {/* Concentric tunnel rings — perspective spacing */}
      <g filter="url(#qRingGlow)">
        <circle cx="50" cy="50" r="43" fill="none" stroke="#F5A623" strokeWidth="0.65" strokeOpacity="0.55"/>
        <circle cx="50" cy="50" r="35" fill="none" stroke="#EC6426" strokeWidth="0.55" strokeOpacity="0.42"/>
        <circle cx="50" cy="50" r="28" fill="none" stroke="#C05A15" strokeWidth="0.50" strokeOpacity="0.32"/>
        <circle cx="50" cy="50" r="21" fill="none" stroke="#8B3500" strokeWidth="0.45" strokeOpacity="0.24"/>
        <circle cx="50" cy="50" r="15" fill="none" stroke="#5A2800" strokeWidth="0.40" strokeOpacity="0.17"/>
        <circle cx="50" cy="50" r="10" fill="none" stroke="#3D1500" strokeWidth="0.35" strokeOpacity="0.12"/>
        <circle cx="50" cy="50" r="6"  fill="none" stroke="#2A0E00" strokeWidth="0.28" strokeOpacity="0.09"/>
        <circle cx="50" cy="50" r="3"  fill="none" stroke="#1a0800" strokeWidth="0.22" strokeOpacity="0.06"/>
      </g>

      {/* Portal energy ripples radiating outward */}
      <circle cx="50" cy="50" fill="none" stroke="#F5A623" strokeWidth="0.8">
        <animate attributeName="r"       values="4;46" dur="3.5s" begin="0s"    repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.35;0" dur="3.5s" begin="0s"    repeatCount="indefinite"/>
      </circle>
      <circle cx="50" cy="50" fill="none" stroke="#EC6426" strokeWidth="0.8">
        <animate attributeName="r"       values="4;46" dur="3.5s" begin="1.17s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.35;0" dur="3.5s" begin="1.17s" repeatCount="indefinite"/>
      </circle>
      <circle cx="50" cy="50" fill="none" stroke="#FFD580" strokeWidth="0.8">
        <animate attributeName="r"       values="4;46" dur="3.5s" begin="2.33s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.30;0" dur="3.5s" begin="2.33s" repeatCount="indefinite"/>
      </circle>

      {/* Distant light — slow breath pulse */}
      <circle cx="50" cy="50" fill="url(#qVanishGlow)">
        <animate attributeName="r"       values="8;13;8" dur="5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.55;1.0;0.55" dur="5s" repeatCount="indefinite"/>
      </circle>

      {/* ── Engineer orbiting the core ── */}
      {/*
        Tidal-locking: engineer placed at translate(0,-28) inside the rotating group.
        As the group rotates, the local +Y axis (toward origin) always points at the core.
        No counter-rotation needed — the orbit itself keeps the engineer facing inward.
      */}
      <g transform="translate(50,50)">
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 0 0"
            to="360 0 0"
            dur="12s"
            repeatCount="indefinite"
          />
          {/* Position engineer 28 units from core center */}
          <g transform="translate(0,-28)">
            <g filter="url(#qEngGlow)">
              {/* Scan beam — dashed line from tablet toward core center */}
              <line
                x1="0" y1="8.5" x2="0" y2="27"
                stroke="#61DAFB"
                strokeWidth="0.6"
                strokeOpacity="0.42"
                strokeDasharray="2 1.5"
              />
              {/* Head */}
              <circle cx="0" cy="-9" r="3.5" fill="#F5A623" opacity="0.95"/>
              {/* Helmet visor — blue holographic */}
              <ellipse cx="0" cy="-9.2" rx="2.3" ry="1.8" fill="#61DAFB" opacity="0.65"/>
              {/* Body / suit */}
              <rect x="-3" y="-5.5" width="6" height="7.5" rx="1.5" fill="#F5A623" opacity="0.90"/>
              {/* Left arm — floating outward */}
              <line x1="-3" y1="-2.5" x2="-6.5" y2="-1.5" stroke="#F5A623" strokeWidth="1.8" strokeLinecap="round"/>
              {/* Right arm — floating outward */}
              <line x1="3" y1="-2.5" x2="6.5" y2="-1.5" stroke="#F5A623" strokeWidth="1.8" strokeLinecap="round"/>
              {/* Left leg — splayed for zero-g */}
              <line x1="-1.5" y1="2" x2="-2.5" y2="5.5" stroke="#F5A623" strokeWidth="1.8" strokeLinecap="round"/>
              {/* Right leg */}
              <line x1="1.5" y1="2" x2="2.5" y2="5.5" stroke="#F5A623" strokeWidth="1.8" strokeLinecap="round"/>
              {/* Tablet body */}
              <rect x="-2.5" y="4" width="5" height="4" rx="0.8" fill="#0D1A24" stroke="#61DAFB" strokeWidth="0.6"/>
              {/* Tablet holographic screen */}
              <rect x="-2" y="4.5" width="4" height="3" rx="0.4" fill="#61DAFB" fillOpacity="0.55"/>
              {/* Screen UI detail lines */}
              <line x1="-1.5" y1="5.5" x2="1.5" y2="5.5" stroke="#FFFFFF" strokeWidth="0.3" strokeOpacity="0.7"/>
              <line x1="-1.5" y1="6.5" x2="0.5" y2="6.5" stroke="#FFFFFF" strokeWidth="0.3" strokeOpacity="0.5"/>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
