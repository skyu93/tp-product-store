import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import * as path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      // CSS module 설정 (styles.cssPropery)
      localsConvention: 'camelCaseOnly',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // @를 src로 지정
    },
  },
});
