// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages user site: https://bijay3030.github.io
export default defineConfig({
  site: 'https://bijay3030.github.io',
  markdown: {
    shikiConfig: { theme: 'min-light' },
  },
  // Pages from the previous Gatsby site, pointed at where that content lives now.
  redirects: {
    '/about': '/#about',
    '/resume': '/resume.pdf',
    '/projects/helios': '/#helios',
    '/projects/quoting': '/#quoting',
    '/projects/alistengine': '/#alistengine',
    '/writing': '/#writing',
    '/writing/tags': '/#writing',
  },
});
