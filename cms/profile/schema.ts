import { curatorSchema } from '@/offcourse/schema';
import { z } from 'zod';

export const schema = curatorSchema.extend({
  courses: z.array(z.string()),
  article: z.array(z.string()),
})

export type ProfileData = z.infer<typeof schema>
