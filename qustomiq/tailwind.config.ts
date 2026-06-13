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
        obsidian: "#080B11",
        surface:  "#0D1117",
        surface2: "#161B22",
        snow:     "#F0F6FC",
        mist:     "#8B949E",
        em:       "#10B981",
        vi:       "#A78BFA",
        teal:     "#34F5C5",
        background:  "#080B11",
        foreground:  "#F0F6FC",
        border:      "rgba(255,255,255,0.07)",
        input:       "rgba(255,255,255,0.07)",
        ring:        "#10B981",
        card:        { DEFAULT: "#0D1117", foreground: "#F0F6FC" },
        destructive: { DEFAULT: "#ef4444", foreground: "#ffffff" },
        popover:     { DEFAULT: "#0D1117", foreground: "#F0F6FC" },
        primary:     { DEFAULT: "#10B981", foreground: "#000000" },
        secondary:   { DEFAULT: "#A78BFA", foreground: "#000000" },
        muted:       { DEFAULT: "#161B22", foreground: "#8B949E" },
        accent:      { DEFAULT: "#161B22", foreground: "#F0F6FC" },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body:    ["var(--font-body)",    "sans-serif"],
        mono:    ["var(--font-mono)",    "monospace"],
      },
      borderRadius: {
        pill: "50px",
        card: "16px",
        btn:  "50px",
      },
    },
  },
  plugins: [],
};

export default config;
