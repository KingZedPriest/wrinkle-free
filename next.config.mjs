/** @type {import('next').NextConfig} */
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

export default nextConfig;
