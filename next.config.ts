import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
      },
    ],
    unoptimized: true, // SSGの場合、Next.jsの画像最適化はオフにする
  },
  output: 'export'
};

export default nextConfig;
