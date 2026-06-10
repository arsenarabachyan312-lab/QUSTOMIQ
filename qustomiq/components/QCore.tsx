export default function QCore() {
  return (
    <svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      style={{ display: "block" }}
      aria-hidden="true"
    >
      {/* Волна 1 — begin 0s */}
      <circle cx="50" cy="50" fill="none" stroke="#F5A623" strokeWidth="1">
        <animate attributeName="r"       values="30;70" dur="2s" begin="0s"   repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.7;0" dur="2s" begin="0s"   repeatCount="indefinite"/>
      </circle>
      {/* Волна 2 — begin 0.7s */}
      <circle cx="50" cy="50" fill="none" stroke="#F5A623" strokeWidth="1">
        <animate attributeName="r"       values="30;70" dur="2s" begin="0.7s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.7;0" dur="2s" begin="0.7s" repeatCount="indefinite"/>
      </circle>
      {/* Волна 3 — begin 1.4s */}
      <circle cx="50" cy="50" fill="none" stroke="#F5A623" strokeWidth="1">
        <animate attributeName="r"       values="30;70" dur="2s" begin="1.4s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.7;0" dur="2s" begin="1.4s" repeatCount="indefinite"/>
      </circle>
      {/* Ядро — три статичных концентрических круга поверх волн */}
      <circle cx="50" cy="50" r="26" fill="#F5A623" opacity="0.2"/>
      <circle cx="50" cy="50" r="20" fill="#FFD166"/>
      <circle cx="50" cy="50" r="13" fill="#FFF3B0"/>
    </svg>
  );
}
