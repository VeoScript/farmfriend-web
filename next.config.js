/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    'API_URL_PRODUCTION': process.env.API_URL_PRODUCTION,
  }
}

module.exports = nextConfig
