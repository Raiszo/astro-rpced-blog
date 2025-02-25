import { initTRPC } from "@trpc/server";
import db from "../db";
import { articles } from "../db/schema";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { CreateAWSLambdaContextOptions } from "@trpc/server/adapters/aws-lambda";
import type { APIGatewayProxyEventV2 } from "aws-lambda";

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

export function createLambdaContext(opts: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>) {
	return {}
}

// export type PublicContext = Awaited<ReturnType<typeof createPublicContext>>;
