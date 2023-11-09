import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    minify: true,
  },
  build: {
    lib: {
      entry: "src/index.js",
      name: "apajs",
      fileName: format => `apa.${format}.js`,
    },
  },
});
