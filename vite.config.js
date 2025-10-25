import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    global: "globalThis",
    "process.env": {},
  },
  optimizeDeps: {
    include: ["simple-peer"],
  },
  build: {
    chunkSizeWarningLimit: 1000, // Increase limit to 1000 KB to avoid warnings
  },
});
