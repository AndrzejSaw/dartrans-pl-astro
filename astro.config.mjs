import { defineConfig } from 'astro/config';
import node from "@astrojs/node";
import tailwind from '@astrojs/tailwind';
import alpinejs from '@astrojs/alpinejs';
import partytown from '@astrojs/partytown';

export default defineConfig({
  site: 'https://ce-rekrutacja.pl',
  // В Astro 5 режим по умолчанию поддерживает гибридную логику
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [
    tailwind({
      configFile: './tailwind.config.cjs',
      applyBaseStyles: false,
    }), 
    alpinejs({ entrypoint: '/src/alpine.ts' }),
    partytown({
      config: {
        forward: ['dataLayer.push', 'gtag'],
        proxyCosmetic: true,
        debug: false, // Отключить debug в production
      },
    }),
  ],
  vite: {
    build: {
      cssCodeSplit: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // Удалить console.log в production
          drop_debugger: true,
        },
        format: {
          comments: false, // Удалить комментарии
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            // Разделить vendor код для лучшего кеширования
            'alpine': ['alpinejs'],
          },
        },
      },
    },
  },
});