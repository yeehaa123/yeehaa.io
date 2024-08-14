import { z } from 'zod';

export const schema = z.object({
  title: z.string(),
  author: z.string().optional(),
  order: z.number(),
  series: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  publishedAt: z.date().optional(),
  bannerImageURL: z.string(),
  excerpt: z.string(),
  description: z.string(),
  tags: z.array(z.string()).min(3).max(7),
  course: z.string().optional(),
})

export const initSchema = schema.extend({
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  publishedAt: z.date().optional(),
})

export type ArticleFrontmatter = z.infer<typeof schema>
export type InitArticleFrontmatter = z.infer<typeof initSchema>

export function init(frontmatter: InitArticleFrontmatter) {
  return schema.parse(frontmatter);
}
