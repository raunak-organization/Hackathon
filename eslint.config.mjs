import { config as baseConfig } from '@repo/eslint-config/base';
import { nextJsConfig } from '@repo/eslint-config/next-js';

export default [
  // Backend
  ...baseConfig.map((c) => ({
    ...c,
    files: ['apps/api/**/*.{ts,js}', 'packages/**/*.{ts,js}'],
  })),

  // Frontend
  ...nextJsConfig.map((c) => ({
    ...c,
    files: ['apps/web/**/*.{ts,tsx,js,jsx}'],
  })),
];
