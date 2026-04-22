// vite.config.js - Projenin ayar ve paketleme dosyası

import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Sitede kullanılan tasarım araçlarını (Tailwind) aktif eder
  plugins: [tailwindcss()],

  // Sitenin GitHub Pages üzerinde hangi isimle yayınlanacağını belirler
  // (Senin proje adın 'omdb-project' olduğu için bu isim yazıldı)
  base: "/omdb-project/",
});
