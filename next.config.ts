// next.config.ts
// This file configures various settings for the Next.js application.

import type {NextConfig} from 'next';

/**
 * @type {NextConfig}
 * @description Configuration object for Next.js.
 * // 🔍 Review and update these settings based on deployment environment and project needs.
 */
const nextConfig: NextConfig = {
  /* config options here */

  // TypeScript specific configurations.
  typescript: {
    // If true, Next.js will ignore TypeScript errors during the build process.
    // TODO: Set to `false` in production or CI to enforce type checking.
    ignoreBuildErrors: true,
  },

  // ESLint specific configurations.
  eslint: {
    // If true, Next.js will ignore ESLint errors during the build process.
    // TODO: Set to `false` in production or CI to enforce linting rules.
    ignoreDuringBuilds: true,
  },

  // Image optimization configuration.
  images: {
    // Defines a list of allowed remote hostnames for optimized images using `next/image`.
    // 🔍 Add any other domains from which images will be served.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co', // Placeholder image service.
        port: '',
        pathname: '/**',
      },
      // TODO: Add other image source hostnames as needed, e.g., your S3 bucket or CDN.
      // {
      //   protocol: 'https',
      //   hostname: 'your-image-cdn.com',
      //   port: '',
      //   pathname: '/**',
      // },
    ],
  },

  // Allowed development origins for features like `next/experimental/礬 ISR with fetch`.
  // This helps prevent CSRF-like attacks during development when using certain Next.js features.
  // 🔧 This list should include URLs of trusted development environments.
  allowedDevOrigins: ['https://6000-firebase-studio-1747844572460.cluster-t23zgfo255e32uuvburngnfnn4.cloudworkstations.dev'],
};

export default nextConfig;
