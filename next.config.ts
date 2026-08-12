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
    return [
      {
        source: "/photos/:path*",
        destination:
          "https://raw.githubusercontent.com/gabrielaascencioloma-cmd/blog-automobilismo/main/public/photos/:path*",
      },
    ];
  },
};

export default nextConfig;
