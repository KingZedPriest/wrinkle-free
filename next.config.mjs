import nextPWA from 'next-pwa';

const isProd = process.env.NODE_ENV === 'production';

const withPWA = nextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: !isProd,  // Disable PWA in development mode
});

const nextConfig = {
  experimental: { serverComponentsExternalPackages: ['@aws-sdk/client-s3', '@aws-sdk/s3-request-presigner'] },
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


export default isProd ? withPWA(nextConfig) : nextConfig;
