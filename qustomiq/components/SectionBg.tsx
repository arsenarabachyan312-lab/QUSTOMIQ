"use client";

export default function SectionBg() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(ellipse 90% 80% at 92% 0%, rgba(248,169,31,0.18) 0%, rgba(236,100,38,0.06) 40%, transparent 70%)",
            "radial-gradient(ellipse 75% 70% at 4% 98%, rgba(236,100,38,0.12) 0%, rgba(248,169,31,0.04) 45%, transparent 68%)",
            "radial-gradient(ellipse 50% 45% at 75% 55%, rgba(248,169,31,0.05) 0%, transparent 60%)",
          ].join(", "),
        }}
      />
    </div>
  );
}
