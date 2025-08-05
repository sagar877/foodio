// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    base: './', 
    plugins: [react()],
    server:{
        allowedHosts:['https://6a60123d54e1.ngrok-free.app/']
    },
    optimizeDeps: {
        exclude: ['react-hook-form'],
    }
})
