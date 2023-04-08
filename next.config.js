/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    'API_URL_PRODUCTION': process.env.API_URL_PRODUCTION,
  },
  images: {
    domains: [
      'i.ibb.co'
    ]
  }
}

module.exports = nextConfig
