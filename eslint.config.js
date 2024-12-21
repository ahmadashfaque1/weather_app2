import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  {
    ignores: ['dist'], // Ignore the build folder
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'], // Include TypeScript files if you're using them with Vite
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        // Add any other global variables your project needs here
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module', // Important for module-based code like Vite
      },
    },
    settings: {
      react: { version: '18.3' }, // Set React version to 18.3 (or another if needed)
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules, // Recommended rules for JavaScript
      ...react.configs.recommended.rules, // Recommended rules for React
      ...react.configs['jsx-runtime'].rules, // Rules for JSX runtime (React 17+)
      ...reactHooks.configs.recommended.rules, // Recommended hooks rules
      'react/jsx-no-target-blank': 'off', // Allow `target="_blank"` in JSX
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }, // Warn about non-component exports
      ],
      'react/prop-types': 'off', // Turn off prop-types for TypeScript (if using TS)
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // Warn about console logs in production
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // Warn about debugger statements in production
    },
  },
];
