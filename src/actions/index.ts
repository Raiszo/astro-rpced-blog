import { defineAction } from "astro:actions";
import { articles, db } from "astro:db";
import { z } from "astro:schema";

export const server = {
	createArticle: defineAction({
		input: z.object({
			slug: z.string(),
			title: z.string(),
			description: z.string(),
			content: z.string(),
		}),
		async handler(input, context) {
			const now = new Date()
			await db.insert(articles).values({
				...input,
				updatedAt: now,
				publishedAt: now,
			})
		},
	})
}
