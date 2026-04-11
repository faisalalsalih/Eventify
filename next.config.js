/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Required so your UploadThing images actually appear on the site
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
      },
    ],
  },
  // Optional: Prevents build failure from minor linting issues (like unused vars)
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig