import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';

const racine = dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: racine });

/** Règles Next.js (core-web-vitals + TypeScript) en config plate ESLint 9. */
const config = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'] },
];

export default config;
