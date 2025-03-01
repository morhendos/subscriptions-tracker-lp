/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // This ensures MongoDB works properly with Next.js
  webpack: (config, { isServer }) => {
    // If we're on the server and trying to import MongoDB
    if (isServer) {
      // Make sure we don't try to bundle MongoDB in the client
      config.externals = [...config.externals, 'mongodb'];
    }
    
    return config;
  },
};

export default nextConfig;
