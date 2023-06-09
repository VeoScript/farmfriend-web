/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    'API_URL_PRODUCTION': process.env.API_URL_PRODUCTION,
    'FARMFRIEND_API_URL': process.env.FARMFRIEND_API_URL,
    'EMAILJS_SERVICE_ID': process.env.EMAILJS_SERVICE_ID,
    'EMAILJS_TEMPLATE_ID': process.env.EMAILJS_TEMPLATE_ID,
    'EMAILJS_PUBLIC_KEY': process.env.EMAILJS_PUBLIC_KEY,
  },
  images: {
    domains: [
      'i.ibb.co'
    ]
  }
}

module.exports = nextConfig
