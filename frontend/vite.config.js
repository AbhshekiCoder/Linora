import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    host: '0.0.0.0', // allow external access
    port: 5173, // or whatever port you're using
    allowedHosts: [
      'localhost',
      '3a44c16fe76c.ngrok-free.app' // ✅ add your ngrok domain here
    ]
  }
})
