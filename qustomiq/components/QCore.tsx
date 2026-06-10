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
      <circle cx="50" cy="50" fill="none" stroke="#EC6426" strokeWidth="1">
        <animate attributeName="r"       values="30;70" dur="2s" begin="0s"   repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.6;0" dur="2s" begin="0s"   repeatCount="indefinite"/>
      </circle>
      {/* Волна 2 — begin 0.7s */}
      <circle cx="50" cy="50" fill="none" stroke="#F8A91F" strokeWidth="1">
        <animate attributeName="r"       values="30;70" dur="2s" begin="0.7s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.6;0" dur="2s" begin="0.7s" repeatCount="indefinite"/>
      </circle>
      {/* Волна 3 — begin 1.4s */}
      <circle cx="50" cy="50" fill="none" stroke="#F8A91F" strokeWidth="1">
        <animate attributeName="r"       values="30;70" dur="2s" begin="1.4s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.6;0" dur="2s" begin="1.4s" repeatCount="indefinite"/>
      </circle>
      {/* Ядро — внешний #EC6426, средний #F8A91F, внутренний #FDE3CF */}
      <circle cx="50" cy="50" r="26" fill="#EC6426" opacity="0.2"/>
      <circle cx="50" cy="50" r="20" fill="#F8A91F"/>
      <circle cx="50" cy="50" r="13" fill="#FDE3CF"/>
    </svg>
  );
}
