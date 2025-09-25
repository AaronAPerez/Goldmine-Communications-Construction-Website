import type { NextConfig } from "next";

// const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  /* config options here */
     devIndicators: false,
   reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Disable optimization in development for faster builds
    // unoptimized: isDev,
    formats: ['image/webp', 'image/avif'],
    // Domains for external images (use remotePatterns for Next.js 13+)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'goldminecomm.net',
      },
      {
        protocol: 'https',
        hostname: 'www.goldminecomm.net',
      },
    ],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes for different breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimize automatic static optimization impact
    minimumCacheTTL: 31536000, // 1 year
    // Enable SVG support
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          }
        ],
      },
      // Specific headers for images
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
      // Headers for optimized images
      {
        source: '/_next/image',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
    ];
  },
  //  devIndicators: false, // Disable development indicators
    
  // Enable React strict mode for development
  // Valid experimental features for current Next.js versions
  experimental: {
    optimizePackageImports: ['lodash', 'date-fns']
  },
  // compiler: {
  //   removeConsole: process.env.NODE_ENV === 'production'
  // }
}

export default nextConfig;