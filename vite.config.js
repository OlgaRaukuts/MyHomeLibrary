import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // если React

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // папка, которая будет создана при сборке
  },
  base: '/',
});