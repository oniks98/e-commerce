
import type { NextConfig } from "next";
import withNextIntl from 'next-intl/plugin';

const withIntl = withNextIntl(
  // This is the default (also the `src` folder is supported out of the box)
  './src/i18n/request.ts'
);

const nextConfig: NextConfig = {
  /* config options here */
};

export default withIntl(nextConfig);
