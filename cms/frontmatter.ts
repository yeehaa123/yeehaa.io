import { z } from 'zod';

export const schema = z.object({
  title: z.string(),
  contentType: z.literal("article"),
  draft: z.boolean(),
  order: z.number().optional(),
  series: z.string().optional(),
  checksum: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  publishedAt: z.date().optional(),
})

export interface Frontmatter {
  title: string,
  contentType: string,
  draft: boolean,
  order?: number | undefined,
  series?: string | undefined,
  checksum: string,
  createdAt: Date,
  updatedAt: Date,
  publishedAt: Date | undefined
}
