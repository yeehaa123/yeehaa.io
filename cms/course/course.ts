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

export type Course = z.infer<typeof schema>

export function init(course: Course) {
  return schema.parse(course);
}
