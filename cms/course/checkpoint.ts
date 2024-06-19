import { z } from 'zod';
import { hashify } from "../helpers";
import * as ai from '../ai';
import { checkpointSchema } from "@/offcourse/schema";

export const initSchema = checkpointSchema.pick({
  task: true,
  href: true,
});

export type InitCheckpoint = z.infer<typeof initSchema>
export type Checkpoint = z.infer<typeof checkpointSchema>;

export function init({ task, href }: InitCheckpoint) {
  return initSchema.parse({ task, href })
}

export async function augment({ task, href, goal, curator }: InitCheckpoint & { goal: string, curator: string }) {
  let checkpointId = hashify(JSON.stringify({ goal, curator, href, task }));
  const augmented = await ai.checkpoint.analyze({ task, href, goal, checkpointId });
  return checkpointSchema.parse(augmented);
}
