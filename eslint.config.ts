import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    ignores: ['dist', 'node_modules'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: {
      js,
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh,
      'simple-import-sort': simpleImportSort
    },
    extends: ['js/recommended'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  {
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'object-curly-spacing': ['error', 'always'],
      'simple-import-sort/imports': 'error',
      'quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      'jsx-quotes': ['error', 'prefer-single'],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]);
