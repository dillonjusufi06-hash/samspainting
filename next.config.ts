import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lakeshore-painting.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.solispainting.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pizzazzpainting.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.elkhartlandscape.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "certapro.com",
        pathname: "/**",
      },
    ],
  },
  output: "standalone",
  transpilePackages: ["motion"],
};

export default nextConfig;
