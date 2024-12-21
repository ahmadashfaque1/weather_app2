import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react()
  ],
  base: '/Weather_app', // Set the base path if you're deploying to a subpath
});
