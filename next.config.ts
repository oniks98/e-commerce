// next.config.ts
import type { NextConfig } from 'next';
import withNextIntl from 'next-intl/plugin';

const withIntl = withNextIntl();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
};

export default withIntl(nextConfig);
