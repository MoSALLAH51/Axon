/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.axonlandscape.com",
      },
    ],
  },

  // Enable static export if needed for CDN deployment
  // output: 'export',
};

export default nextConfig;