import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // если используешь React

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Единственная папка для сборки
  },
  base: '/', // Базовый путь для Firebase Hosting
});