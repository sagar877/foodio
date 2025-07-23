// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    base: './', 
    plugins: [react()],
    server:{
        allowedHosts:['https://4d8c83b44616.ngrok-free.app/']
    }
})
