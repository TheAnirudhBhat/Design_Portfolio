import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,md,mdx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#D30AD7",
          dark: "#A808AB",
        },
        surface: {
          primary: "#FFFFFF",
          secondary: "#F5F5F5",
          tertiary: "#EBEBEB",
          card: "#FFFFFF",
        },
        text: {
          primary: "rgba(0,0,0,0.9)",
          secondary: "rgba(0,0,0,0.7)",
          tertiary: "rgba(0,0,0,0.5)",
          disabled: "rgba(0,0,0,0.3)",
        },
        "on-color": {
          primary: "#FFFFFF",
          secondary: "rgba(255,255,255,0.7)",
          tertiary: "rgba(255,255,255,0.5)",
        },
        outline: {
          bold: "rgba(0,0,0,0.15)",
          subtle: "rgba(0,0,0,0.05)",
        },
        positive: "#00A63E",
        negative: "#E63741",
        warning: "#FF9800",
        info: "#2196F3",
      },
      fontFamily: {
        sans: ["Rubik", "sans-serif"],
      },
      fontWeight: {
        normal: "400",
        medium: "500",
      },
      spacing: {
        "3xs": "2px",
        "2xs": "4px",
        xs: "8px",
        s: "12px",
        m: "16px",
        l: "24px",
        xl: "32px",
        "2xl": "40px",
        "3xl": "48px",
        "4xl": "64px",
      },
      borderRadius: {
        xs: "4px",
        s: "8px",
        m: "16px",
        l: "24px",
        full: "9999px",
      },
      boxShadow: {
        card: "0 2px 32px rgba(0,0,0,0.05)",
        elevated: "0 4px 12px rgba(0,0,0,0.12)",
        high: "0 8px 24px rgba(0,0,0,0.16)",
        "nav-active": "0 0 16px rgba(0,0,0,0.12)",
      },
      fontSize: {
        display: [
          "48px",
          { lineHeight: "56px", fontWeight: "500", letterSpacing: "-0.48px" },
        ],
        h1: ["32px", { lineHeight: "40px", fontWeight: "500" }],
        h2: [
          "24px",
          { lineHeight: "32px", fontWeight: "500", letterSpacing: "0.48px" },
        ],
        h3: ["20px", { lineHeight: "24px", fontWeight: "500" }],
        h4: ["16px", { lineHeight: "20px", fontWeight: "500" }],
        body: ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-sm": [
          "14px",
          {
            lineHeight: "20px",
            fontWeight: "400",
            letterSpacing: "0.28px",
          },
        ],
        caption: [
          "12px",
          {
            lineHeight: "16px",
            fontWeight: "400",
            letterSpacing: "0.24px",
          },
        ],
        metadata: ["10px", { lineHeight: "12px", fontWeight: "400" }],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
