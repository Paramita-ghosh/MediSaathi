import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  // THIS IS THE CRITICAL PART
  server: {
    proxy: {
      // This says "any request that starts with /api"
      '/api': {
        target: 'http://localhost:5000', // Send it to the backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

