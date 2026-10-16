/** @type {import('next').NextConfig} */
const nextConfig = {
  // repassa /api/* para o backend Express, evitando bloqueio de CORS no navegador
  async rewrites() {
    return [{ source: '/api/:path*', destination: 'http://localhost:3005/api/:path*' }];
  },
};

export default nextConfig;
