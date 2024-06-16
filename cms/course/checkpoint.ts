import { z } from 'zod';
import { hashify } from "../helpers";
import * as ai from '../ai';

export const schema = z.object({
  checkpointId: z.string(),
  task: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  href: z.string()
})

export type Checkpoint = z.infer<typeof schema>;

export function init({ task, href, goal, curator }:
  { task: string, href: string, goal: string, curator: string }) {
  let checkpointId = hashify(JSON.stringify({ goal, curator, href, task }));
  return { checkpointId, task, href }
}

export async function augment({ task, href, goal, checkpointId }:
  { task: string, href: string, goal: string, checkpointId: string }) {
  return await ai.checkpoint.analyze({ task, href, goal, checkpointId });
}
