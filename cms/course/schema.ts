import { z } from 'zod';
import * as m from "../meta/schema"
import { courseSchema, checkpointSchema } from "@/offcourse/schema";

export const rawCheckpointSchema = z.object({
  task: z.string(),
  href: z.string(),
})

const analysisSchema = z.object({
  description: z.string(),
  tags: z.array(z.string()),
  checkpoints: z.array(checkpointSchema)
})

const associationsSchema = z.object({
  habitat: z.string().optional()
})

const augmentationsSchema = analysisSchema;

export const outputSchema = courseSchema.extend({
  curator: z.string(),
  habitat: z.string().optional(),
})


export const rawCourseSchema = z.object({
  goal: z.string(),
  curator: z.string(),
  habitat: z.string().optional(),
  checkpoints: z.array(rawCheckpointSchema)
})

export const initSchema = z.object({
  author: z.string(),
  course: rawCourseSchema
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

export type RawCheckpoint = z.infer<typeof rawCheckpointSchema>
export type RawCourse = z.infer<typeof rawCourseSchema>
export type InitCourse = z.infer<typeof initSchema>
export type BaseCourse = z.infer<typeof baseSchema>
export type AnalyzedCourse = z.infer<typeof analyzedSchema>
export type AssociatedCourse = z.infer<typeof associatedSchema>
export type FinalCourse = z.infer<typeof finalSchema>

export type Course =
  | BaseCourse
  | AnalyzedCourse
  | AssociatedCourse
  | FinalCourse;
