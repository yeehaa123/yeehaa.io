import { z } from 'zod';
import * as as from "../association"
import * as m from "../meta/schema"

export type Tag =
  | BaseTag
  | AnalyzedTag
  | AssociatedTag
  | FinalTag

export const baseSchema = z.object({
  meta: m.schema,
  tag: z.boolean()

})
export const analysisSchema = z.object({
  tags: z.array(z.string()),
})

const associationsSchema = z.object({
  articles: z.array(as.schema),
  courses: z.array(as.schema),
})

export const augmentationsSchema = z.object({
  checksum: z.string(),
  summary: z.string(),
  excerpt: z.string(),
})

export const analyzedSchema = baseSchema.extend({
  analysis: analysisSchema
})

export const outputSchema = augmentationsSchema.extend({
  title: z.string(),
  articles: z.array(z.string()),
  courses: z.array(z.string()),
})

export const associatedSchema = analyzedSchema.extend({
  associations: associationsSchema
})

export const finalSchema = associatedSchema.extend({
  augmentations: augmentationsSchema
})


export type BaseTag = z.infer<typeof baseSchema>
export type AnalyzedTag = z.infer<typeof analyzedSchema>
export type AssociatedTag = z.infer<typeof associatedSchema>
export type FinalTag = z.infer<typeof finalSchema>
