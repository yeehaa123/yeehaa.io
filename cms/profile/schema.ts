import { curatorSchema } from '@/offcourse/schema';
import { z } from 'zod';

export const profileDataSchema = curatorSchema.extend({
  courses: z.array(z.string()),
  article: z.array(z.string()),
})

export type ProfileData = z.infer<typeof profileDataSchema>
