import { z } from 'zod';
import * as m from "../meta/schema"
import * as as from "../association"
import { courseSchema, curatorSchema } from "@/offcourse/schema";
import { baseCheckpointSchema, checkpointSchema } from "../checkpoint/schema"

export type Course =
  | BaseCourse
  | AnalyzedCourse
  | AssociatedCourse
  | FinalCourse;


export const analysisSchema = z.object({
  description: z.string(),
  tags: z.array(z.string()),
  checkpoints: z.array(checkpointSchema)
})

const associationsSchema = z.object({
  habitat: as.schema.optional(),
  profile: as.schema.optional()
})

const augmentationsSchema = analysisSchema;

export const outputSchema = courseSchema.extend({
  curator: curatorSchema,
  series: z.string().optional(),
  habitat: z.string().optional(),
})

export const rawCourseSchema = z.object({
  courseId: z.string(),
  goal: z.string(),
  curator: z.string(),
  habitat: z.string().optional(),
  checkpoints: z.array(baseCheckpointSchema)
})

export const initSchema = z.object({
  title: z.string(),
  author: z.string(),
  course: rawCourseSchema,
  series: z.string().optional()
})

export const baseSchema = z.object({
  meta: m.schema,
  course: rawCourseSchema
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

export type RawCourse = z.infer<typeof rawCourseSchema>
export type InitCourse = z.infer<typeof initSchema>
export type BaseCourse = z.infer<typeof baseSchema>
export type AnalyzedCourse = z.infer<typeof analyzedSchema>
export type AssociatedCourse = z.infer<typeof associatedSchema>
export type FinalCourse = z.infer<typeof finalSchema>
