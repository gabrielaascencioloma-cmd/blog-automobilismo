import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The built-in AVIF/WebP optimizer hangs on-demand in this environment
    // (Next 16 + Turbopack + sharp); serve local photos unoptimized instead.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "blog-automobilismo-ai9bp8hvf-loma-team1.vercel.app",
      },
    ],
  },
  async rewrites() {
    // Photos are served from the previous immutable deployment.
    // This avoids re-uploading ~13MB of binary files on every deploy.
    return [
      {
        source: "/photos/:path*",
        destination:
          "https://blog-automobilismo-ai9bp8hvf-loma-team1.vercel.app/photos/:path*",
      },
    ];
  },
};

export default nextConfig;
