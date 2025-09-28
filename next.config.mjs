import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['passkey-kit', 'passkey-kit-sdk', 'sac-sdk'],
};

export default withNextIntl(nextConfig);
