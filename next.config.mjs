/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {}, // Formato correcto para serverActions
  },
  // allowedDevOrigins ahora va directamente en el root
  allowedDevOrigins: ["192.168.1.104", "localhost"]
};

export default nextConfig;