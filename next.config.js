const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const nextTranslate = require('next-translate')

const withVanillaExtract = createVanillaExtractPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/api/v1/**'
      }
    ]
  }
}

module.exports = 
  nextTranslate(
    withVanillaExtract(
      nextConfig
    )
  )