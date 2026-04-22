import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Tailwind eklentisini çalıştırır
  plugins: [tailwindcss()],

  // GitHub Pages için en güvenli yol budur:
  base: "./",

  build: {
    // Paketlenen dosyaların 'dist' yerine doğrudan ana dizine yakın durması için (opsiyonel)
    outDir: "dist",
  },
});
