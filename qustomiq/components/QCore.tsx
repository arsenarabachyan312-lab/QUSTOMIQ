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
        {/* Outer dark ring — crater look: dark center, slightly lighter at rim */}
        <radialGradient id="qDarkRing1" cx="50%" cy="42%" r="58%">
          <stop offset="0%"   stopColor="#1a0800"/>
          <stop offset="62%"  stopColor="#1a0800"/>
          <stop offset="100%" stopColor="#3D1500"/>
        </radialGradient>

        {/* Inner dark ring — deeper crater */}
        <radialGradient id="qDarkRing2" cx="50%" cy="42%" r="58%">
          <stop offset="0%"   stopColor="#0D0400"/>
          <stop offset="52%"  stopColor="#0D0400"/>
          <stop offset="100%" stopColor="#2D1000"/>
        </radialGradient>

        {/* Core glow — white-hot center to orange corona */}
        <radialGradient id="qCoreGlow" cx="38%" cy="33%" r="65%">
          <stop offset="0%"   stopColor="#FFFFFF"/>
          <stop offset="18%"  stopColor="#FFF3B0"/>
          <stop offset="42%"  stopColor="#FFD166"/>
          <stop offset="68%"  stopColor="#F8A91F"/>
          <stop offset="100%" stopColor="#EC6426"/>
        </radialGradient>

        {/* Ring stroke gradient: light top-left → dark bottom-right */}
        <linearGradient id="qRingBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#6B3010"/>
          <stop offset="100%" stopColor="#1A0500"/>
        </linearGradient>

        {/* Bloom filter for the core */}
        <filter id="qBloom" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* ── Concentric dark rings (depth / crater effect) ── */}
      <circle
        cx="50" cy="50" r="44"
        fill="url(#qDarkRing1)"
        stroke="url(#qRingBorder)"
        strokeWidth="1.5"
      />
      <circle
        cx="50" cy="50" r="30"
        fill="url(#qDarkRing2)"
        stroke="#3A1808"
        strokeWidth="1.5"
      />

      {/* ── Solar wind waves ── */}
      <circle cx="50" cy="50" fill="none" stroke="#EC6426" strokeWidth="1.2">
        <animate attributeName="r"       values="20;42" dur="2s" begin="0s"   repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.7;0" dur="2s" begin="0s"   repeatCount="indefinite"/>
      </circle>
      <circle cx="50" cy="50" fill="none" stroke="#F8A91F" strokeWidth="1.2">
        <animate attributeName="r"       values="20;42" dur="2s" begin="0.7s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.7;0" dur="2s" begin="0.7s" repeatCount="indefinite"/>
      </circle>
      <circle cx="50" cy="50" fill="none" stroke="#FFD166" strokeWidth="1.2">
        <animate attributeName="r"       values="20;42" dur="2s" begin="1.4s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.7;0" dur="2s" begin="1.4s" repeatCount="indefinite"/>
      </circle>

      {/* ── Glowing core — pulsing living ball ── */}
      <circle cx="50" cy="50" fill="url(#qCoreGlow)" filter="url(#qBloom)">
        <animate attributeName="r" values="18;19.5;18" dur="2s" repeatCount="indefinite"/>
      </circle>

      {/* Specular highlight (light refraction spot top-left) */}
      <ellipse cx="43" cy="42" rx="5.5" ry="3.5" fill="rgba(255,255,255,0.22)"/>
    </svg>
  );
}
