import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Ensures correct paths
  server: {
    historyApiFallback: true, // Ensures routing works during development
  },
  build: {
    outDir: 'dist', // Build output directory
    emptyOutDir: true, // Clears the output directory before each build
  },
  resolve: {
    alias: {
      '@': '/src', // Optional alias for your source directory
    },
  },
});
