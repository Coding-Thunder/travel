/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // ← THIS is critical

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    unoptimized: true,       // ← REQUIRED for static export if using next/image
  },
};

export default nextConfig;