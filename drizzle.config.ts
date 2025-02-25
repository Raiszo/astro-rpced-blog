import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: 'turso',
	schema: "./src/db/schema.ts",
	dbCredentials: {
		url: process.env.DB_REMOTE_URL!,
	},
	strict: true,
});
