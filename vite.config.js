import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      react: path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
    },
  },

  // REQUIRED FOR REACT ROUTER ON VERCEL
  server: {
    port: 5173,
  },

  // IMPORTANT FOR CLIENT-SIDE ROUTING BUILD
  build: {
    outDir: "dist",
  }
});
