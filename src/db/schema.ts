import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, customType } from "drizzle-orm/sqlite-core";

// Taken from:
// https://stackoverflow.com/questions/52869695/check-if-a-date-string-is-in-iso-and-utc-format
const isISODateString = (str: string) => /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str);

const dateType = customType<{
	data: Date
	driverData: string
}>({
	dataType() {
		return 'text'
	},
	fromDriver(value) {
		if (!isISODateString(value)) {
			// values saved using CURRENT_TIMESTAMP are not valid ISO strings
			// but *are* in UTC, so append the UTC zone.
			value += 'Z';
		}
		return new Date(value)
	},
	toDriver(value) {
		return value.toISOString()
	},
})

export const articles = sqliteTable('articles', {
	id: integer('id').primaryKey(),
	slug: text('slug').unique().notNull(),
	title: text('title').notNull(),
	description: text('description').notNull(),
	content: text('content').notNull(),
	publishedAt: dateType('published_at').notNull(),
	createdAt: dateType('created_at')
		.notNull()
		.default(sql`(CURRENT_TIMESTAMP)`),
	updatedAt: dateType('updated_at')
		.notNull()
		.default(sql`(CURRENT_TIMESTAMP)`)
		.$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
})
