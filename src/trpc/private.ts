import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { APIRoute } from "astro";
import { private_router, createAstroContext, createLambdaContext } from "../procedures/private";
import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";

export const prerender = false

export const ALL: APIRoute = (opts) => {
	return fetchRequestHandler({
		endpoint: 'api/trpc/private',
		req: opts.request,
		router: private_router,
		createContext: createAstroContext,
	})
}

export const handler = awsLambdaRequestHandler({
	router: private_router,
	createContext: createLambdaContext,
})
