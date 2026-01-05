import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  /* --- KONFIGURASI PRODUKSI UNTUK VERCEL --- */
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 2000,
    minify: 'esbuild',
    sourcemap: false,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  // Inovasi: Memastikan server development lancar
  server: {
    port: 5173,
    strictPort: true,
  }
})