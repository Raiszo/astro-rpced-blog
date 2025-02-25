import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { APIRoute } from "astro";
import { admin_router, createAstroContext, createLambdaContext } from "../../../../procedures/admin";
import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";

export const prerender = false

export const ALL: APIRoute = (opts) => {
	return fetchRequestHandler({
		endpoint: 'api/trpc/admin',
		req: opts.request,
		router: admin_router,
		createContext: createAstroContext,
	})
}

export const handler = awsLambdaRequestHandler({
	router: admin_router,
	createContext: createLambdaContext,
})
