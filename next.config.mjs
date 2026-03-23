/** @type {import('next').NextConfig} */
const nextConfig = {
  // Genera un servidor Node.js autónomo en .next/standalone
  // Necesario para el build Docker con imagen mínima
  output: 'standalone',
};

export default nextConfig;
