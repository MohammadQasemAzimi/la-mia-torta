/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tse1.mm.bing.net',
        port: '',
      },
    ],
  },

}

module.exports = nextConfig
