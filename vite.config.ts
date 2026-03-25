import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/neuro-center/',
  assetsInclude: ['**/*.JPG', '**/*.PNG', '**/*.HEIC', '**/*.heic'],
})
