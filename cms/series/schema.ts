import { z } from 'zod';
import * as as from "../association"
import * as m from "../meta/schema"

export type Series =
  | BaseSeries
  | AnalyzedSeries
  | AssociatedSeries
  | FinalSeries

export const baseSchema = z.object({
  meta: m.schema,
  series: z.boolean()

})
export const analysisSchema = z.object({})

const associationsSchema = z.object({
  articles: z.array(as.schema),
})

export const augmentationsSchema = z.object({
  checksum: z.string(),
  summary: z.string(),
  excerpt: z.string(),
  tags: z.array(z.string()),
  bannerImageURL: z.string(),
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


export type BaseSeries = z.infer<typeof baseSchema>
export type AnalyzedSeries = z.infer<typeof analyzedSchema>
export type AssociatedSeries = z.infer<typeof associatedSchema>
export type FinalSeries = z.infer<typeof finalSchema>
