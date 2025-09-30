const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['passkey-kit', 'passkey-kit-sdk', 'sac-sdk'],
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      buffer: require.resolve('buffer'),
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'farm-images.example.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'openweathermap.org',
        pathname: '/img/wn/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
};

module.exports = withNextIntl(nextConfig);
