/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Remove the rewrites since we'll access data directly from public folder
}

module.exports = nextConfig