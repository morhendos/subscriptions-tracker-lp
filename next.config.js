/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure experimental features are disabled
  experimental: {
    appDir: true,
  }
}

// Use CommonJS module.exports instead of ES module export
module.exports = nextConfig