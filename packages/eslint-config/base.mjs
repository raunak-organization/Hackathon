import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import turboPlugin from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';
import globals from 'globals';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommendedTypeChecked,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',

      'no-duplicate-imports': 'error',
      'prefer-const': 'error',
      'dot-notation': 'error',
      'no-debugger': 'warn',

      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: false },
      ],
      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/promise-function-async': 'warn',
    },
  },
  {
    languageOptions: {
      parserOptions: {
        project: true,
      },
      globals: {
        ...globals.node,
      },
    },
  },
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**'],
  },
];
