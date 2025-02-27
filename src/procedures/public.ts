import { initTRPC } from "@trpc/server";
import db from "../db";
import { articles } from "../db/schema";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

const t = initTRPC.create()

export const public_router = t.router({
	getSampleList: t.procedure
		.query(async () => {
			await db
				.select({
					id: articles.id,
					title: articles.title,
				})
				.from(articles)
				.limit(3)
		})
})

export type PublicRouter = typeof public_router

export function createAstroContext(opts: FetchCreateContextFnOptions) {
  return opts
}

export function createLambdaContext() {
	return {}
}

// export type PublicContext = Awaited<ReturnType<typeof createPublicContext>>;
