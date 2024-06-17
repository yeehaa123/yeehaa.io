import { z } from 'zod';
import { hashify } from "../helpers";
import * as ai from '../ai';


export const initSchema = z.object({
  task: z.string(),
  href: z.string()
})

export const schema = initSchema.extend({
  checkpointId: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
})

export type InitCheckpoint = z.infer<typeof initSchema>
export type Checkpoint = z.infer<typeof schema>;

export function init({ task, href }: InitCheckpoint) {
  return initSchema.parse({ task, href })
}

export async function augment({ task, href, goal, curator }: InitCheckpoint & { goal: string, curator: string }) {
  let checkpointId = hashify(JSON.stringify({ goal, curator, href, task }));
  const augmented = await ai.checkpoint.analyze({ task, href, goal, checkpointId });
  return schema.parse(augmented);
}
