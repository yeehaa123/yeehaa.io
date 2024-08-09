import * as m from "../meta/schema"
import { landingContentInput, landingContentSchema } from "./contentSchema";
import { z } from 'zod';
import * as as from "../association"

export type Landing =
  | BaseLanding
  | AnalyzedLanding
  | AssociatedLanding
  | FinalLanding


export const initSchema = z.object({
  author: z.string(),
  page_content: landingContentInput
})

export const analysisSchema = z.object({
  description: z.string(),
  excerpt: z.string(),
  tags: z.array(z.string()),
})

const associationsSchema = z.object({
  courses: z.array(as.schema),
  articles: z.array(as.schema),
})

export const augmentationsSchema = z.object({
  bannerImageURL: z.string(),
  profileImageURL: z.string(),
})

export const outputSchema = landingContentSchema
  .merge(analysisSchema)
  .merge(augmentationsSchema)

export const baseSchema = z.object({
  meta: m.schema,
  page_content: landingContentInput,
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

export { landingContentSchema }
export type LandingContent = z.infer<typeof landingContentSchema>
export type InitLanding = z.infer<typeof initSchema>
export type BaseLanding = z.infer<typeof baseSchema>
export type AnalyzedLanding = z.infer<typeof analyzedSchema>
export type AssociatedLanding = z.infer<typeof associatedSchema>
export type FinalLanding = z.infer<typeof finalSchema>
