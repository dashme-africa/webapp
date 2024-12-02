import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // Ensure your output directory is correct
  },
  server: {
    proxy: {}, // Add any API proxies if needed
  },
});
