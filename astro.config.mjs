// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // El sitio sigue siendo estático: solo /api/confirmar corre como función.
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()]
  }
});
