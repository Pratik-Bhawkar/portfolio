import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// https://vitejs.dev/config/
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  // Set the base path for GitHub Pages when served from a subfolder
  // If BASE_PATH is not defined, it will default to '/'
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^@\//, replacement: path.resolve(__dirname, 'src') + '/' },
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
})
