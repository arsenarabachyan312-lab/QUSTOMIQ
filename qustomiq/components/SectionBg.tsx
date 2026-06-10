"use client";

export default function SectionBg() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Radial gradient accents */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(ellipse 80% 60% at 95% 5%,  rgba(248,169,31,0.07) 0%, transparent 70%)",
            "radial-gradient(ellipse 70% 55% at  3% 95%, rgba(236,100,38,0.05) 0%, transparent 65%)",
            "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(245,166,35,0.05) 0%, transparent 60%)",
          ].join(", "),
        }}
      />

      {/* Circle 1 — EC6426, 300px, top-right, 40s CW */}
      <svg
        className="absolute -top-16 -right-16 shape-spin-cw"
        width="300" height="300" viewBox="0 0 300 300"
        style={{ transformOrigin: "150px 150px" }}
      >
        <circle cx="150" cy="150" r="140" stroke="#EC6426" strokeWidth="1" strokeOpacity="0.06" fill="none" />
      </svg>

      {/* Circle 2 — EC6426, 400px, bottom-left, 55s CW */}
      <svg
        className="absolute -bottom-20 -left-20 shape-spin-cw"
        width="400" height="400" viewBox="0 0 400 400"
        style={{ transformOrigin: "200px 200px", animationDuration: "55s" }}
      >
        <circle cx="200" cy="200" r="190" stroke="#EC6426" strokeWidth="1" strokeOpacity="0.06" fill="none" />
      </svg>

      {/* Hexagon 1 — F8A91F, 160px, center-right, 50s CCW */}
      <svg
        className="absolute top-[30%] right-[8%] shape-spin-ccw"
        width="160" height="160" viewBox="0 0 160 160"
        style={{ transformOrigin: "80px 80px" }}
      >
        <polygon
          points="80,14 141,47 141,113 80,146 19,113 19,47"
          stroke="#F8A91F" strokeWidth="1" strokeOpacity="0.08" fill="none"
        />
      </svg>

      {/* Hexagon 2 — F8A91F, 200px, top-left, 60s CCW */}
      <svg
        className="absolute top-[5%] left-[15%] shape-spin-ccw"
        width="200" height="200" viewBox="0 0 200 200"
        style={{ transformOrigin: "100px 100px", animationDuration: "60s" }}
      >
        <polygon
          points="100,17 177,58 177,142 100,183 23,142 23,58"
          stroke="#F8A91F" strokeWidth="1" strokeOpacity="0.08" fill="none"
        />
      </svg>

      {/* Triangle 1 — #632713, 120px, bottom-right, float */}
      <svg
        className="absolute bottom-[15%] right-[22%] shape-float"
        width="120" height="120" viewBox="0 0 120 120"
      >
        <polygon
          points="60,12 108,96 12,96"
          stroke="#632713" strokeWidth="1.5" strokeOpacity="0.05" fill="none"
        />
      </svg>

      {/* Triangle 2 — #632713, 180px, center-left, float delayed */}
      <svg
        className="absolute top-[45%] -left-6 shape-float"
        width="180" height="180" viewBox="0 0 180 180"
        style={{ animationDelay: "3s", animationDuration: "10s" }}
      >
        <polygon
          points="90,15 165,145 15,145"
          stroke="#632713" strokeWidth="1.5" strokeOpacity="0.05" fill="none"
        />
      </svg>
    </div>
  );
}
