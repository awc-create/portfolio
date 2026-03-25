/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  trailingSlash: false,
  eslint: { ignoreDuringBuilds: true },
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ['node-ssh'],
  outputFileTracingIncludes: {
    '/**/*': ['./node_modules/bcryptjs/**']
  }
}

module.exports = nextConfig