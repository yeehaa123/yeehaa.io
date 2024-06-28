import { z } from 'zod';

export const curatorSchema = z.object({
  name: z.string(),
  alias: z.string(),
  socials: z.object({
    linkedin: z.string().optional(),
    github: z.string().optional(),
    instagram: z.string().optional()
  })
})

export const habitatSchema = z.object({
  slug: z.string()
})

export const analysisSchema = z.object({
  excerpt: z.string(),
  summary: z.string(),
  tags: z.array(z.string())
})

export const checkpointSchema = z.object({
  task: z.string(),
  href: z.string(),
  checkpointId: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
})

export const courseSchema = z.object({
  courseId: z.string(),
  goal: z.string(),
  curator: curatorSchema,
  description: z.string(),
  habitat: habitatSchema.optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  publishedAt: z.date().optional(),
  tags: z.array(z.string()),
  checkpoints: z.array(checkpointSchema)
})

export const courseQuery = courseSchema.pick({
  courseId: true
})

export const checkpointQuery = courseQuery.merge(checkpointSchema).pick({
  courseId: true,
  checkpointId: true
})

export type Analysis = z.infer<typeof analysisSchema>
export type Course = z.infer<typeof courseSchema>
export type Checkpoint = z.infer<typeof checkpointSchema>

export type Habitat = z.infer<typeof habitatSchema>
export type Curator = z.infer<typeof curatorSchema>

export type CourseQuery = z.infer<typeof courseQuery>
export type CheckpointQuery = z.infer<typeof checkpointQuery>
