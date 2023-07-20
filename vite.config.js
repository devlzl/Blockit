import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@blocks': path.resolve(__dirname, 'src/blocks'),
      '@editor': path.resolve(__dirname, 'src/editor/Editor.vue'),
      '@renderer': path.resolve(__dirname, 'src/renderer'),
      '@rich-text': path.resolve(__dirname, 'src/rich-text/RichText.vue'),
    }
  },
  server: {
    port: 3000,
    host: '0.0.0.0'
  }
})
