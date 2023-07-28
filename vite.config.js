import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@blocks': path.resolve(__dirname, 'src/blocks/index.js'),
      '@editor': path.resolve(__dirname, 'src/editor/Editor.vue'),
      '@kernel': path.resolve(__dirname, 'src/kernel/Kernel.js'),
      '@renderer': path.resolve(__dirname, 'src/renderer'),
      '@store': path.resolve(__dirname, 'src/store/_main.js'),
    }
  },
  server: {
    port: 3000,
    host: '0.0.0.0'
  }
})
