import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "olive-quick-duck-51.mypinata.cloud",
      }
    ]
  }
};

export default nextConfig;
