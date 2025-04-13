// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Pantry-Pal/', // ← replace with your actual repo name
  plugins: [react()],
});
