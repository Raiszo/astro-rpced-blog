import rss from '@astrojs/rss';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import type { APIRoute } from 'astro';

export const prerender = false

export const GET: APIRoute = async (context) => {
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site ?? '',
		items: [],				// TODO consume db to generate items
	});
}
