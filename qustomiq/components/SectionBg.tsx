"use client";

export default function SectionBg() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Radial gradient accents — emerald + violet */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(ellipse 70% 55% at 95% 5%,  rgba(16,185,129,0.06)  0%, transparent 70%)",
            "radial-gradient(ellipse 60% 50% at  3% 95%, rgba(167,139,250,0.05) 0%, transparent 65%)",
            "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(16,185,129,0.03)  0%, transparent 60%)",
          ].join(", "),
        }}
      />

      {/* Circle 1 — emerald, 300px, top-right, slow spin */}
      <svg
        className="absolute -top-16 -right-16"
        width="300" height="300" viewBox="0 0 300 300"
        style={{
          transformOrigin: "150px 150px",
          animation: "orbit-cw 55s linear infinite",
        }}
      >
        <circle cx="150" cy="150" r="140"
          stroke="#10B981" strokeWidth="1" strokeOpacity="0.07" fill="none" />
      </svg>

      {/* Circle 2 — violet, 400px, bottom-left */}
      <svg
        className="absolute -bottom-20 -left-20"
        width="400" height="400" viewBox="0 0 400 400"
        style={{
          transformOrigin: "200px 200px",
          animation: "orbit-cw 70s linear infinite",
        }}
      >
        <circle cx="200" cy="200" r="190"
          stroke="#A78BFA" strokeWidth="1" strokeOpacity="0.06" fill="none" />
      </svg>

      {/* Hexagon 1 — emerald, center-right */}
      <svg
        className="absolute top-[30%] right-[8%]"
        width="160" height="160" viewBox="0 0 160 160"
        style={{
          transformOrigin: "80px 80px",
          animation: "orbit-ccw 60s linear infinite",
        }}
      >
        <polygon
          points="80,14 141,47 141,113 80,146 19,113 19,47"
          stroke="#10B981" strokeWidth="1" strokeOpacity="0.09" fill="none"
        />
      </svg>

      {/* Hexagon 2 — violet, top-left */}
      <svg
        className="absolute top-[5%] left-[15%]"
        width="200" height="200" viewBox="0 0 200 200"
        style={{
          transformOrigin: "100px 100px",
          animation: "orbit-ccw 80s linear infinite",
        }}
      >
        <polygon
          points="100,17 177,58 177,142 100,183 23,142 23,58"
          stroke="#A78BFA" strokeWidth="1" strokeOpacity="0.07" fill="none"
        />
      </svg>

      {/* Triangle 1 — subtle, bottom-right */}
      <svg
        className="absolute bottom-[15%] right-[22%]"
        width="120" height="120" viewBox="0 0 120 120"
      >
        <polygon
          points="60,12 108,96 12,96"
          stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.06" fill="none"
        />
      </svg>

      {/* Triangle 2 — subtle, center-left */}
      <svg
        className="absolute top-[45%] -left-6"
        width="180" height="180" viewBox="0 0 180 180"
        style={{ animationDelay: "3s", animationDuration: "10s" }}
      >
        <polygon
          points="90,15 165,145 15,145"
          stroke="#A78BFA" strokeWidth="1.5" strokeOpacity="0.05" fill="none"
        />
      </svg>
    </div>
  );
}
