import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Old standalone pages now live as sections on the home page.
  async redirects() {
    return [
      { source: "/experience", destination: "/#experience", permanent: false },
      { source: "/skills", destination: "/#skills", permanent: false },
      { source: "/process", destination: "/#approach", permanent: false },
      { source: "/contact", destination: "/#contact", permanent: false },
    ];
  },
};

export default nextConfig;
