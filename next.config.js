/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: 'export' REMOVED — now a Node.js server app
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
  // Allow SSH key env var with newlines
  serverExternalPackages: ["node-ssh"],
}

module.exports = nextConfig