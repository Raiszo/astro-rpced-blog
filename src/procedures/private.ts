import { initTRPC } from "@trpc/server";
import { z } from "astro/zod";
import db from "../db";
import { articles } from "../db/schema";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

const t = initTRPC.create()

export const prerender = false

export const private_router = t.router({
	createArticle: t.procedure
		.input(z.object({
			slug: z.string(),
			title: z.string(),
			description: z.string(),
			content: z.string(),
		}))
		.mutation(async (opts) => {
			const { input } = opts
			await db.insert(articles).values({
				slug: input.slug,
				title: input.title,
				description: input.description,
				content: input.content,
				publishedAt: new Date(),
			})
		})
})

export type PrivateRouter = typeof private_router

export function createAstroContext(opts: FetchCreateContextFnOptions) {
	return opts
}
export function createLambdaContext() {
	return {}
}
// export type AdminContext = Awaited<ReturnType<typeof createAstroContext>>;
