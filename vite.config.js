import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Ensures paths are resolved correctly
  server: {
    historyApiFallback: true, // Optional: Needed for local development with SPA routing
  },
  build: {
    outDir: 'dist', // Render expects the build files in the "dist" folder
    emptyOutDir: true, // Clears old build files before creating new ones
  },
});
