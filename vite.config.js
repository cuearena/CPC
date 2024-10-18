import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/back-end': 'http://localhost:3000',
    }
  },
  plugins: [react()],
})
