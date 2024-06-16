import { z } from 'zod';

import * as cp from "./checkpoint"

export const schema = z.object({
  courseId: z.string(),
  goal: z.string(),
  curator: z.string(),
  description: z.string(),
  habitat: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  publishedAt: z.date().optional(),
  tags: z.array(z.string()),
  checkpoints: z.array(cp.schema)
})

export const initSchema = schema.extend({
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  publishedAt: z.date().optional(),
})

export type Course = z.infer<typeof schema>
export type InitCourse = z.infer<typeof initSchema>

export function init(course: InitCourse) {
  return schema.parse(course);
}
