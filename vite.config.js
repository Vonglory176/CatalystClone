import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // Enable the injectManifest mode
      injectManifest: {
        swSrc: '/service-worker.js',
      },
    })
  ],
  build: {
    sourcemap: true // Enable source maps for production builds
  },
  base: "/"
})
