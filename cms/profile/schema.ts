import { curatorSchema } from '@/offcourse/schema';
import * as m from "../meta/schema"
import { z } from 'zod';

export type Profile =
  | BaseProfile
  | AnalyzedProfile
  | AssociatedProfile
  | FinalProfile

export const profileDataSchema = curatorSchema.extend({
  courses: z.array(z.string()),
  article: z.array(z.string()),
})

export const initSchema = z.object({
  author: z.string(),
  data: curatorSchema.partial(),
  content: z.string(),
})

const associationsSchema = z.object({
  courses: z.array(z.string()).optional(),
  articles: z.array(z.string()).optional()
})

export const baseSchema = z.object({
  meta: m.schema,
  profile: curatorSchema,
  bio: z.string()
})

export const analyzedSchema = baseSchema

export const associatedSchema = analyzedSchema.extend({
  associations: associationsSchema
})

export const finalSchema = associatedSchema

export type InitProfile = z.infer<typeof initSchema>
export type BaseProfile = z.infer<typeof baseSchema>
export type AnalyzedProfile = z.infer<typeof analyzedSchema>
export type AssociatedProfile = z.infer<typeof associatedSchema>
export type FinalProfile = z.infer<typeof finalSchema>
