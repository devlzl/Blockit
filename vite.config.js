import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@blocks': path.resolve(__dirname, 'src/blocks/_index.js'),
      '@editor': path.resolve(__dirname, 'src/editor/Editor.vue'),
      '@kernel': path.resolve(__dirname, 'src/kernel/_index.js'),
      '@store': path.resolve(__dirname, 'src/store/_index.js'),
      '@visual': path.resolve(__dirname, 'src/visual/_index.js'),
    }
  },
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  base: '/Blockit/',
})
