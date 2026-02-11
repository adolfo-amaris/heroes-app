import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // @ts-ignore - Vitest types
  test: {
    globals: true,
    environment: 'jsdom',
    // No hace falta repetir alias aquí si están en resolve y usas un solo archivo
  },
})