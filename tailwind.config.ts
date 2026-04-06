import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dw-bg": "#0A0A0F",
        "dw-surface": "#12121A",
        "dw-text": "#E8E8ED",
        "dw-muted": "#6B6B7B",
        "dw-accent": "#FFD60A",
        "dw-accent-muted": "rgba(255,214,10,0.2)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      fontSize: {
        hero: "clamp(4rem, 12vw, 12rem)",
        section: "clamp(2rem, 4vw, 3.5rem)",
      },
    },
  },
  plugins: [typography],
};

export default config;
