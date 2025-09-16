// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: 'https://alextrotchenko.github.io',
  base: '/ai-slides/',
  output: 'static',
  integrations: [tailwindcss()],
});
