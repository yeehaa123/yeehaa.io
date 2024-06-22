import { z } from 'zod';
import * as m from "../meta/schema"

const augmentationsSchema = z.object({
  summary: z.string(),
  excerpt: z.string(),
  tags: z.array(z.string()),
  imageURL: z.string(),
})

export const initSchema = z.object({
  title: z.string(),
  author: z.string(),
  series: z.string().optional(),
  article: z.string(),
})
export const baseSchema = z.object({
  meta: m.schema,
  article: z.string()
})

export const finalSchema = baseSchema.extend({
  augmentations: augmentationsSchema
})

export type InitArticle = z.infer<typeof initSchema>
export type BaseArticle = z.infer<typeof baseSchema>
export type FinalArticle = z.infer<typeof finalSchema>
export type Article = BaseArticle | FinalArticle;
