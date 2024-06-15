import { z } from 'zod';

export const schema = z.object({
  title: z.string(),
  author: z.string(),
  order: z.number().optional(),
  series: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  publishedAt: z.date().optional(),
  imageURL: z.string(),
  excerpt: z.string(),
  summary: z.string(),
  tags: z.array(z.string()).min(3).max(7),
})

export type ArticleFrontmatter = z.infer<typeof schema>

export function init(frontmatter: ArticleFrontmatter) {
  return schema.parse(frontmatter);
}
