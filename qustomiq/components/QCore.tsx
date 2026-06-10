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
        {/* Portal depth: pure black void → ember glow at rim */}
        <radialGradient id="qPortalDepth" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#000000"/>
          <stop offset="20%"  stopColor="#080200"/>
          <stop offset="42%"  stopColor="#1a0800"/>
          <stop offset="66%"  stopColor="#3D1500"/>
          <stop offset="83%"  stopColor="#8B3500"/>
          <stop offset="100%" stopColor="#C05A15"/>
        </radialGradient>

        {/* Distant light — faint amber glow at vanishing point */}
        <radialGradient id="qVanishGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#FFF3B0" stopOpacity="0.22"/>
          <stop offset="45%"  stopColor="#F5A623" stopOpacity="0.07"/>
          <stop offset="100%" stopColor="#000000" stopOpacity="0"/>
        </radialGradient>

        {/* Subtle bloom on tunnel rings */}
        <filter id="qRingGlow" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.7" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Portal floor — deep void radial gradient */}
      <circle cx="50" cy="50" r="48" fill="url(#qPortalDepth)"/>

      {/* Concentric tunnel rings — perspective spacing (gaps shrink toward center) */}
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

      {/* Portal energy ripples — radiate from vanishing point outward */}
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

      {/* Distant light — barely visible, slow breath pulse */}
      <circle cx="50" cy="50" fill="url(#qVanishGlow)">
        <animate attributeName="r"       values="8;13;8" dur="5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.55;1.0;0.55" dur="5s" repeatCount="indefinite"/>
      </circle>
    </svg>
  );
}
