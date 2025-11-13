import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@ansible/ansible-ui-framework/index.css': '@ansible/ansible-ui-framework/index.css'
    }
  },
  optimizeDeps: {
    include: ['@ansible/ansible-ui-framework']
  }
})
