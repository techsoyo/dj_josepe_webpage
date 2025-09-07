/**
 * @type {import('next').NextConfig}
 *
 * This configuration enables the new app directory and
 * explicitly allows images to be served from any origin.
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  // App directory es estable en Next.js 15, no necesita experimental
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  // Especificar la raíz del workspace para evitar warning de múltiples lockfiles
  outputFileTracingRoot: require('path').join(__dirname, '../'),
};

module.exports = nextConfig;
