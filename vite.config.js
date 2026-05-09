import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,         // Default Vite port
    strictPort: true,   // Fail if port is in use
    open: true,         // Open browser automatically
    watch: {
      usePolling: true, // Improves file watch reliability
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-helmet-async'], // Pre-bundle key dependencies
  },
});
