import { z } from 'zod';
import * as ai from '../ai';

export const schema = z.object({
  task: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  href: z.string()
})

export type Checkpoint = z.infer<typeof schema>;

export async function augment({ task, href, goal }: { task: string, href: string, goal: string }) {
  return await ai.checkpoint.analyze({ task, href, goal });
}
