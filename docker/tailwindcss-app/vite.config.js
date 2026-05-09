import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0',  // Allow access from other containers
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true,
    },
    hmr: {
      protocol: 'ws',
      host: 'tailwindcss.localhost',
      // port: 80, // Nginx handles the external traffic
      clientPort: 80, // Ensure it uses the correct Nginx port
      path: '/vite',  // Match the WebSocket proxy path in Nginx
    },
  }
  
})