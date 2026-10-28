import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://futurizatech.com',
  output: 'static',
  compressHTML: true,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date('2026-10-28T12:00:00Z'),
      serialize(item) {
        if (item.url === 'https://futurizatech.com/') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        } else if (
          item.url.includes('/privacidad') ||
          item.url.includes('/terminos')
        ) {
          item.priority = 0.3;
          item.changefreq = 'monthly';
        }
        return item;
      },
    }),
  ],
  vite: {
    // Garantiza retrocompatibilidad transparente con variables existentes VITE_* y nuevas PUBLIC_* en Cloudflare Pages
    envPrefix: ['PUBLIC_', 'VITE_'],
    build: {
      cssMinify: true,
      target: 'es2020',
    },
  },
});
