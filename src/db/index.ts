import { drizzle } from "drizzle-orm/libsql";

const db = drizzle({
	connection: {
		url: process.env.DB_REMOTE_URL!,
	},
})

export default db
