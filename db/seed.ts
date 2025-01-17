import { articles, db } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(articles).values([
	{
	  slug: 'first-post',
	  title: 'First post',
	  description: 'Lorem ipsum dolor sit amet',
	  createdAt: new Date(),
	  updatedAt: new Date(),
	  publishedAt: new Date(),
	  content: `
	  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae ultricies leo integer malesuada nunc vel risus commodo viverra. Adipiscing enim eu turpis egestas pretium. Euismod elementum nisi quis eleifend quam adipiscing. In hac habitasse platea dictumst vestibulum. Sagittis purus sit amet volutpat. Netus et malesuada fames ac turpis egestas. Eget magna fermentum iaculis eu non diam phasellus vestibulum lorem. Varius sit amet mattis vulputate enim. Habitasse platea dictumst quisque sagittis. Integer quis auctor elit sed vulputate mi. Dictumst quisque sagittis purus sit amet.
`
	}
  ])
}
