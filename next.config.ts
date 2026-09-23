import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

/** Configuration Next.js : pages MDX activées, icônes devicon (jsdelivr) autorisées pour `next/image`. */
const configuration: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.jsdelivr.net' }],
  },
};

const avecMDX = createMDX({});

export default avecMDX(configuration);
