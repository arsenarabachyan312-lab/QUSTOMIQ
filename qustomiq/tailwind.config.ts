import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        "accent-deep": "var(--accent-deep)",
        "accent-ink": "var(--accent-ink)",
        line: "var(--line)",
        panel: "var(--panel)",
        white: "#EDE6D3",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        pill: "50px",
        card: "22px",
        btn: "12px",
      },
      boxShadow: {
        card: "0 6px 20px rgba(26,18,0,.10)",
        "card-lg": "0 24px 60px rgba(26,18,0,.14)",
        glow: "0 0 40px rgba(229,212,74,.35)",
      },
      animation: {
        qfloat: "qfloat 7s ease-in-out infinite",
        qspin: "qspin 38s linear infinite",
        qspinrev: "qspinrev 38s linear infinite",
        "fade-up": "fadeUp .4s ease both",
        pulse: "pulse-dot 2s ease-in-out infinite",
      },
      keyframes: {
        qfloat: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        qspin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        qspinrev: {
          from: { transform: "translate(-50%,-50%) rotate(0deg)" },
          to: { transform: "translate(-50%,-50%) rotate(-360deg)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-dot": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(229,212,74,.5)" },
          "50%": { boxShadow: "0 0 0 6px rgba(229,212,74,0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
