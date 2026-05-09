import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   watch: {
  //     usePolling: true, // Ensures file changes are detected in Docker
  //   },
  //   host: "0.0.0.0", // Allows access from outside the container
  //   port: 5173, // Matches your Dockerfile EXPOSE
  // },
})
