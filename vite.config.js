import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Ensures correct paths
  build: {
    outDir: 'dist', // Build output directory
    emptyOutDir: true, // Clears the output directory before each build
  },
  server: {
    historyApiFallback: true, // Ensures routing works during development
  },
  resolve: {
    alias: {
      '@': '/src', // Optional alias for your source directory
    },
  },
});
