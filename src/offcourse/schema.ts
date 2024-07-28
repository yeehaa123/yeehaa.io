import { z } from 'zod';

export const curatorSchema = z.object({
  name: z.string(),
  alias: z.string(),
  socials: z.object({
    linkedin: z.string().optional(),
    github: z.string().optional(),
    instagram: z.string().optional()
  }),
  bio: z.string()
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
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  publishedAt: z.coerce.date().optional(),
  tags: z.array(z.string()),
  checkpoints: z.array(checkpointSchema)
})

export const noteSchema = z.object({
  note: z.string(),
  annotatedAt: z.coerce.date(),
})

export const courseQuery = courseSchema.pick({
  courseId: true
})

export const coursesQuery = z.object({
  courseIds: z.array(z.string())
})

export const checkpointQuery = courseQuery.merge(checkpointSchema).pick({
  courseId: true,
  checkpointId: true
})

export const authState = z.object({
  userName: z.string(),
  repository: z.string()
})

export const userRecord = z.object({
  courseId: z.string(),
  isBookmarked: z.boolean(),
  isFollowed: z.boolean(),
  completed: z.array(z.string()),
  notes: z.array(noteSchema)
});

export type Note = z.infer<typeof noteSchema>
export type AuthState = z.infer<typeof authState>
export type Analysis = z.infer<typeof analysisSchema>
export type Course = z.infer<typeof courseSchema>
export type Checkpoint = z.infer<typeof checkpointSchema>
export type UserRecord = z.infer<typeof userRecord>

export type Habitat = z.infer<typeof habitatSchema>
export type Curator = z.infer<typeof curatorSchema>


export type CourseQuery = z.infer<typeof courseQuery>
export type CoursesQuery = z.infer<typeof coursesQuery>
export type CheckpointQuery = z.infer<typeof checkpointQuery>
