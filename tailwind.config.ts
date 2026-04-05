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
        bg: "#0A0A0F",
        surface: "#12121A",
        "text-primary": "#E8E8ED",
        "text-secondary": "#6B6B7B",
        accent: "#FFD60A",
        "accent-muted": "rgba(255,214,10,0.2)",
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
