import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Ensure SPA fallback works on refresh during local development
    historyApiFallback: true,
  },
  build: {
    // Increase chunk size warning limit to avoid noise from Three.js
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        // Split large vendor chunks for faster loading
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (
              id.includes('three') ||
              id.includes('@react-three/fiber') ||
              id.includes('@react-three/drei')
            ) {
              return 'three-vendor'
            }
            if (id.includes('framer-motion')) {
              return 'framer-motion'
            }
          }
        },
      },
    },
  },
})
