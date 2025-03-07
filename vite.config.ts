import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { defineConfig } from 'vite';


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
base: '/smarthealth_3/',  // Set the base path for deployment
  build: {
    outDir: 'dist',
    assetsDir: '',
    rollupOptions: {
      output: {
        entryFileNames: 'smarthealth/App.css',
        chunkFileNames: 'smarthealth/index.css',
        assetFileNames: 'smarthealth/main.ts',
      }
    }
  },
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
