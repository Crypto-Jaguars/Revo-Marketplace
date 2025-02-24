const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... your existing config
}

module.exports = withNextIntl(nextConfig); 