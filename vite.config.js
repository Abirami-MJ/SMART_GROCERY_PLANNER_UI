import { defineConfig } from 'vite'
import react from '@vitejs/react-refresh'

export default defineConfig({
  base: '/SMART_GLOCERY_PLANNER_UI/',
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})
