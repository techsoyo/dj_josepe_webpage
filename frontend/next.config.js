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
  // Configurar las rutas para el monorepo
  experimental: {
    appDir: true,
  },
  // Especificar dónde están los directorios
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
};

module.exports = nextConfig;
