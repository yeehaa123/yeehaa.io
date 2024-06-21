import { z } from 'zod';
import { courseSchema } from "@/offcourse/schema";

export const schema = courseSchema.extend({
  curator: z.string(),
  habitat: z.string().optional(),
})

export const initSchema = schema.extend({
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  publishedAt: z.date().optional(),
})

export type Course = z.infer<typeof schema>
export type InitCourse = z.infer<typeof initSchema>
