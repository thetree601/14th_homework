/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'main-practice.codebootcamp.co.kr',
        port: '',
        pathname: '/**', // 모든 경로 허용
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/graphql',
        destination: 'http://main-practice.codebootcamp.co.kr/graphql',
      },
    ];
  },
};

export default nextConfig;