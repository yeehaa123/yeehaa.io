import { z } from 'zod';

export const schema = z.object({
  title: z.string(),
  contentType: z.literal("article"),
  publishedAt: z.date().optional(),
  checksum: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  draft: z.boolean()
})
