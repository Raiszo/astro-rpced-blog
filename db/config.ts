import { column, defineDb, defineTable } from 'astro:db';

const Article = defineTable({
  columns: {
	id: column.number({ primaryKey: true }),
	slug: column.text(),
	title: column.text(),
	description: column.text(),
	content: column.text(),
	publishedAt: column.date(),
	createdAt: column.date(),
	updatedAt: column.date(),
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: {
	articles: Article,
  }
});
