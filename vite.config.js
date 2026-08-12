import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, 
    environment: 'jsdom',
    setupFiles: './src/setupTest.js',  
  },
})


// globals: true nos permite usar describe, it, expect sin importarlos en cada archivo //
// environment: 'jsdom' simula el navegador //
// setupFiles apunta a un archivo que se ejecuta antes de cada test //