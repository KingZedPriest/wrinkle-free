/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: !isProd,  // Disable PWA in development mode
});

const nextConfig = {
  experimental: { serverComponentsExternalPackages: [ '@aws-sdk/client-s3', '@aws-sdk/s3-request-presigner' ] },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wrinkle-free.s3.eu-north-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = isProd ? withPWA(nextConfig) : nextConfig;