import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'elizaos.ai',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
