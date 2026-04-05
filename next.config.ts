import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.vert": { type: "raw" },
      "*.frag": { type: "raw" },
      "*.glsl": { type: "raw" },
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(vert|frag|glsl)$/,
      type: "asset/source",
    });
    return config;
  },
};

export default nextConfig;
