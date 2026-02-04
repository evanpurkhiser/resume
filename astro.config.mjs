// @ts-check
import {defineConfig} from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import pdfGenerator from './integrations/pdf-generator.mjs';

// https://astro.build/config
export default defineConfig({
  integrations: [pdfGenerator()],
  build: {
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
