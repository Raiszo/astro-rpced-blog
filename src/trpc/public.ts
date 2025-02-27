import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { APIRoute } from "astro";
import { createAstroContext, createLambdaContext, public_router } from "../procedures/public";
import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";

export const prerender = false

export const ALL: APIRoute = (opts) => {
	return fetchRequestHandler({
		endpoint: 'api/trpc/public',
		req: opts.request,
		router: public_router,
		createContext: createAstroContext,
	})
}

export const handler = awsLambdaRequestHandler({
	router: public_router,
	createContext: createLambdaContext,
})
