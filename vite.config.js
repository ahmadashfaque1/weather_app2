import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    outDir: 'build',
  },

  plugins: [
    react()
  ],
  base: '/weather_app2/', // Set the base path if you're deploying to a subpath
});
