import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: '/rainfall',
  build: {
    outDir: '../nginx-data/html/rainfall',
    emptyOutDir: true, // also necessary
  }
})
