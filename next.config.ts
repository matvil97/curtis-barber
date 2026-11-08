import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    qualities: [75],
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    // Fixe la racine du projet (un package-lock.json parent sinon détecté à tort).
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
