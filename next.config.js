/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  env: {
    PROJECT_ID: process.env.PROJECT_ID,
    HUDDLE_PROJECT_ID: process.env.HUDDLE_PROJECT_ID,
    LIGHTHOUSE_APIKEY:process.env.LIGHTHOUSE_APIKEY
  }
}

module.exports = nextConfig
