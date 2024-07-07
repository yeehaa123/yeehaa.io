import { z } from 'zod';
import * as as from "../association"
import * as m from "../meta/schema"

export type Article =
  | BaseArticle
  | AnalyzedArticle
  | AssociatedArticle
  | FinalArticle;

export const analysisSchema = z.object({
  description: z.string(),
  excerpt: z.string(),
  tags: z.array(z.string()),
})

const augmentationsSchema = z.object({
  bannerImageURL: z.string(),
})

const associationsSchema = z.object({
  course: as.schema.optional(),
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

export const analyzedSchema = baseSchema.extend({
  analysis: analysisSchema
})

export const associatedSchema = analyzedSchema.extend({
  associations: associationsSchema
})

export const finalSchema = associatedSchema.extend({
  augmentations: augmentationsSchema
})

export type InitArticle = z.infer<typeof initSchema>
export type BaseArticle = z.infer<typeof baseSchema>
export type AnalyzedArticle = z.infer<typeof analyzedSchema>
export type AssociatedArticle = z.infer<typeof associatedSchema>
export type FinalArticle = z.infer<typeof finalSchema>

