// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import db from '@astrojs/db';

import vue from '@astrojs/vue';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  output: 'static',
  integrations: [sitemap(), db(), vue()],

  adapter: node({
    mode: 'standalone',
  }),
});
