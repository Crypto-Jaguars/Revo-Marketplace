import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['passkey-kit', 'passkey-kit-sdk', 'sac-sdk', '@stellar/stellar-sdk'],
  experimental: {
    esmExternals: 'loose',
  },
  webpack: (config) => {
    // Handle TypeScript files in node_modules
    config.module.rules.push({
      test: /\.ts$/,
      include: /node_modules\/(passkey-kit|passkey-kit-sdk|sac-sdk)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { targets: { node: 'current' } }],
            '@babel/preset-typescript',
          ],
          plugins: ['@babel/plugin-transform-export-namespace-from'],
        },
      },
    });

    return config;
  },
};

export default withNextIntl(nextConfig);
