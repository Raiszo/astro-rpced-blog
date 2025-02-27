// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import path from 'node:path'

import vue from '@astrojs/vue';
import amplifyAdapter from "./amplify-adapter";

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  output: 'static',
  integrations: [sitemap(), vue()],

	adapter: amplifyAdapter({
		publicRouterFile: path.join(import.meta.dirname, 'src/trpc/public.ts'),
		privateRouterFile: path.join(import.meta.dirname, 'src/trpc/private.ts'),
	}),
	vite: {
		ssr: {
			// this way server build will contain its dependencies
			noExternal:  true,
		},
	},
});
