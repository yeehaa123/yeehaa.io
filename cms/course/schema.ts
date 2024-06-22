import { z } from 'zod';
import * as m from "../meta/schema"
import { courseSchema, checkpointSchema } from "@/offcourse/schema";

export const rawCheckpointSchema = z.object({
  task: z.string(),
  href: z.string(),
})


const augmentationsSchema = z.object({
  description: z.string(),
  tags: z.array(z.string()),
  checkpoints: z.array(checkpointSchema)
})

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



export const finalSchema = baseSchema.extend({
  augmentations: augmentationsSchema
})

export type RawCheckpoint = z.infer<typeof rawCheckpointSchema>
export type RawCourse = z.infer<typeof rawCourseSchema>
export type InitCourse = z.infer<typeof initSchema>
export type BaseCourse = z.infer<typeof baseSchema>
export type FinalCourse = z.infer<typeof finalSchema>
export type Course = BaseCourse | FinalCourse;
