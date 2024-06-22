import { curatorSchema } from '@/offcourse/schema';
import * as m from "../meta/schema"
import { z } from 'zod';

export const profileDataSchema = curatorSchema.extend({
  courses: z.array(z.string()),
  article: z.array(z.string()),
})

export const initSchema = z.object({
  author: z.string(),
  data: curatorSchema.partial(),
  content: z.string(),
})

export const baseSchema = z.object({
  meta: m.schema,
  profile: curatorSchema,
  bio: z.string()
})

export const analyzedSchema = baseSchema

export const finalSchema = baseSchema

export type InitProfile = z.infer<typeof initSchema>
export type BaseProfile = z.infer<typeof baseSchema>
export type AnalyzedProfile = z.infer<typeof analyzedSchema>
export type FinalProfile = z.infer<typeof finalSchema>
export type Profile = BaseProfile | AnalyzedProfile | FinalProfile
