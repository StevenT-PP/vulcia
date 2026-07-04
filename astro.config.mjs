// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://vulcia.fr',
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        const url = item.url;
        if (url === 'https://vulcia.fr/') {
          return { ...item, priority: 1.0, changefreq: 'weekly' };
        }
        if (['/tarifs/', '/comparatif/', '/contact/', '/calculateur-roi/'].some(p => url.endsWith(p))) {
          return { ...item, priority: 0.9, changefreq: 'weekly' };
        }
        if (['/agent-ia/', '/creation-site-web/', '/referencement-seo/', '/automatisation-ia/', '/services/', '/processus/'].some(p => url.endsWith(p))) {
          return { ...item, priority: 0.8, changefreq: 'monthly' };
        }
        if (url.includes('/ia-pour/')) {
          return { ...item, priority: 0.75, changefreq: 'monthly' };
        }
        if (url.includes('/blog/')) {
          return { ...item, priority: 0.7, changefreq: 'monthly' };
        }
        return { ...item, priority: 0.5, changefreq: 'monthly' };
      },
    }),
  ]
});
