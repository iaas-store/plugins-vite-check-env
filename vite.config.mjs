import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [],
  build: {
    lib:{
      entry: resolve(__dirname, "src/index.ts"),
      name: "CheckEnv",
      fileName: 'index',
    }
  },
  outDir: 'dist', 
  emptyOutDir: true
})