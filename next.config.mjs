/** @type {import('next/config').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Allow Strapi images
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
      {
        protocol: "https",
        hostname: "*.strapi.io",
      },
      {
        protocol: "https",
        hostname: "strapi-production-*.up.railway.app",
      },
      {
        protocol: "https",
        hostname: "*.herokuapp.com",
      },
    ],
  },
};

export default nextConfig;
