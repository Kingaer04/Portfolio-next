import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:      "#0D1117",
        surface: "#161B22",
        border:  "#30363D",
        green:   "#3FB950",
        cyan:    "#58A6FF",
        orange:  "#F0883E",
        text:    "#E6EDF3",
        muted:   "#8B949E",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "monospace"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%":       { opacity: "0" },
        },
        "dot-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%":       { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-8px)" },
        },
      },
      animation: {
        blink:     "blink 1s step-end infinite",
        float:     "float 3s ease-in-out infinite",
        "dot-pulse": "dot-pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
