/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ TypeScript e ESLint habilitados para garantir qualidade do código
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['app', 'components', 'lib', 'contexts', 'hooks'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // 🖼️ Otimização de imagens habilitada
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh5.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'www.liveacademia.com.br',
      },
      {
        protocol: 'https',
        hostname: 'cdn1.pactorian.net',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}

export default nextConfig
