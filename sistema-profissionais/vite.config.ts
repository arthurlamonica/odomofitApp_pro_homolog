import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 5174,
  },
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        format: 'iife',
        name: 'DomoFitProApp',
        inlineDynamicImports: true,
        entryFileNames: 'assets/app.js',
        chunkFileNames: 'assets/app.js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/app.css';
          }
          return 'assets/[name][extname]';
        },
      },
    },
  },
});
