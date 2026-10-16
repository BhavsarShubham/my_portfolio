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
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        // Split large vendor chunks for faster loading
        manualChunks: {
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'framer-motion': ['framer-motion'],
        },
      },
    },
  },
})
