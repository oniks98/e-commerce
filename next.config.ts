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
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:locale/auth',
        destination: '/:locale',
        permanent: false,
      },
    ];
  },
};

export default withIntl(nextConfig);
