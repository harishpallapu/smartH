import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { defineConfig } from 'vite';


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    build: {
    outDir: 'dist',  // Final build folder
    assetsDir: '',    // No separate assets directory (CSS will be placed under dist)
    rollupOptions: {
      output: {
        // Make sure both JavaScript and CSS go into the `smarthealth` folder
        entryFileNames: 'smarthealth/[name].js',  // JavaScript files will go into smarthealth/
        chunkFileNames: 'smarthealth/[name].js',  // Chunks go into smarthealth/
        assetFileNames: 'smarthealth/[name][extname]'  // CSS (and other assets) will go into smarthealth/
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
