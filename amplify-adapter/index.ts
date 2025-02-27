import type { AstroIntegration } from "astro";
import path from 'node:path'

type AmplifyAdapterOptions = {
	publicRouterFile: string
	privateRouterFile: string
}
export default function amplifyAdapter({
	publicRouterFile, privateRouterFile
}: AmplifyAdapterOptions): AstroIntegration {
	return {
		name: 'amplify-adapter',
		hooks: {
			'astro:config:setup': ({ injectRoute, command, addWatchFile }) => {
				if (command === 'dev') {
					injectRoute({
						pattern: '/api/trpc/public/[trpc]',
						entrypoint: publicRouterFile,
						prerender: false,
					})
					addWatchFile(publicRouterFile)
					injectRoute({
						pattern: '/api/trpc/private/[trpc]',
						entrypoint: privateRouterFile,
						prerender: false,
					})
					addWatchFile(privateRouterFile)
				}
			},
			'astro:config:done': ({ config, setAdapter }) => {
				setAdapter({
					name: 'amplify-adapter',
					// serverEntrypoint: import.meta.dirname + '/server',
					serverEntrypoint: path.join(import.meta.dirname, 'server'),
					adapterFeatures: {
						edgeMiddleware: false,
						buildOutput: 'server',
					},
					supportedAstroFeatures: {
						staticOutput: 'stable',
						serverOutput: 'stable',
						hybridOutput: 'stable',
						sharpImageService: 'stable',
					},
					args: {
						client: config.build.client?.toString(),
						server: config.build.server?.toString(),
						host: config.server.host,
						port: 3000,
						assets: config.build.assets,
						mode: 'standalone',
					},
				})
			},
			// 'astro:build:done': async ({ dir, pages }) => {
			// 	const manifest = {
			// 		version: 1,
			// 		routes: [
			// 			{
			// 				path: `${_config.base}assets/*`,
			// 				target: {
			// 					kind: "Static",
			// 				},
			// 			},
			// 			{
			// 				path: `${_config.base}*.*`,
			// 				target: {
			// 					kind: "Static",
			// 				},
			// 				fallback: {
			// 					kind: "Compute",
			// 					src: "default",
			// 				},
			// 			},
			// 			{
			// 				path: "/*",
			// 				target: {
			// 					kind: "Compute",
			// 					src: "default",
			// 				},
			// 			},
			// 		],
			// 		computeResources: [
			// 			{
			// 				name: "default",
			// 				entrypoint: "entry.mjs",
			// 				runtime: "nodejs18.x",
			// 			},
			// 		],
			// 		framework: {
			// 			name: "astro",
			// 			version: "5.0.0",
			// 		},
			// 	};
			// }
		},
	}
}
